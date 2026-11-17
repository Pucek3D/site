import { z } from 'zod'

/**
 * One schema shared by the browser and the API route, so the two can never
 * disagree about what a valid inquiry is. Messages are CODES, not sentences:
 * each side maps them to the reader's language.
 */
export const topics = ['agency', 'brand', 'training', 'general'] as const
export type Topic = (typeof topics)[number]

export const formLanguages = ['en', 'pl', 'de'] as const

export type ErrorCode = 'required' | 'email' | 'url' | 'tooShort' | 'tooLong' | 'phone'

// International or national format: digits, spaces, dashes, dots, brackets, one leading +. 7 to 15 digits.
const PHONE_RE = /^\+?[0-9 ()./-]{7,24}$/
const phoneDigits = (v: string) => v.replace(/\D/g, '').length
const phoneValid = (v: string) => PHONE_RE.test(v) && phoneDigits(v) >= 7 && phoneDigits(v) <= 15

const text = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')
const optionalText = (max: number) => z.string().trim().max(max, 'tooLong').optional().default('')
const choice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { error: 'required' })

export const contactSchema = z
  .object({
    topic: choice(topics),
    name: text(120),
    email: z.string().trim().min(1, 'required').max(200, 'tooLong').pipe(z.email('email')),
    company: text(160),
    role: optionalText(120),
    website: z
      .string()
      .trim()
      .max(300, 'tooLong')
      .refine((v) => v === '' || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v), 'url')
      .optional()
      .default(''),
    language: choice(formLanguages),
    improve: z.string().trim().min(1, 'required').min(20, 'tooShort').max(3000, 'tooLong'),
    // Required confirmation that the person wants a reply (which may include an offer about this
    // inquiry). It is NOT consent under Art. 6(1)(a) and NOT marketing: answering still rests on
    // Art. 6(1)(b)/(f), it is never sent to the consent register and never starts a double opt-in.
    inquiryConfirm: z.literal(true, { error: 'required' }),
    // The two marketing consents below are optional, independent and never gate the inquiry;
    // they only start a separate double opt-in.
    consentEmail: z.boolean().optional().default(false),
    consentPhone: z.boolean().optional().default(false),
    phone: z.string().trim().max(40, 'tooLong').optional().default(''),
    // Honeypot: real people never see or fill this.
    company_url: z.string().max(0).optional().default(''),
  })
  .superRefine((d, ctx) => {
    // The number is required only for the phone consent it serves.
    if (!d.consentPhone) return
    if (!d.phone) ctx.addIssue({ code: 'custom', path: ['phone'], message: 'required' })
    else if (!phoneValid(d.phone)) ctx.addIssue({ code: 'custom', path: ['phone'], message: 'phone' })
  })
  // Without phone consent the number is neither kept nor passed on, even if one was typed.
  .transform((d) => ({ ...d, phone: d.consentPhone ? d.phone : '' }))

export type ContactInput = z.infer<typeof contactSchema>
export type FieldErrors = Partial<Record<keyof ContactInput, ErrorCode>>

export function validateContact(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors } {
  const result = contactSchema.safeParse(raw)
  if (result.success) return { ok: true, data: result.data }
  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactInput
    if (key && !errors[key]) {
      const code = issue.message as ErrorCode
      errors[key] = (['required', 'email', 'url', 'tooShort', 'tooLong', 'phone'] as const).includes(code)
        ? code
        : 'required'
    }
  }
  return { ok: false, errors }
}

/* ------------------------------------------------------------------------- */
/* Consent sign-up and withdrawal (/subscribe, /unsubscribe)                  */
/* ------------------------------------------------------------------------- */

export type SubscribeErrorCode = 'required' | 'email' | 'phone' | 'tooLong' | 'consentRequired'
const subscribeCodes: readonly SubscribeErrorCode[] = ['required', 'email', 'phone', 'tooLong', 'consentRequired']

const emailField = z.string().trim().min(1, 'required').max(200, 'tooLong').pipe(z.email('email'))

export const subscribeSchema = z
  .object({
    email: emailField,
    name: optionalText(120),
    company: optionalText(160),
    consentEmail: z.boolean().optional().default(false),
    consentPhone: z.boolean().optional().default(false),
    phone: z.string().trim().max(40, 'tooLong').optional().default(''),
    /** Set only in lead-magnet mode. Whether it names a real magnet is checked by the caller. */
    magnet: z.string().trim().max(80, 'tooLong').optional().default(''),
    company_url: z.string().max(0).optional().default(''),
  })
  .superRefine((d, ctx) => {
    // Updates mode exists only to send marketing e-mail, so it needs that consent.
    // Lead-magnet mode delivers the material either way; consent stays optional there.
    if (!d.magnet && !d.consentEmail) ctx.addIssue({ code: 'custom', path: ['consentEmail'], message: 'consentRequired' })
    if (d.consentPhone) {
      if (!d.phone) ctx.addIssue({ code: 'custom', path: ['phone'], message: 'required' })
      else if (!phoneValid(d.phone))
        ctx.addIssue({ code: 'custom', path: ['phone'], message: 'phone' })
    }
  })
  // Without phone consent the number is neither kept nor passed on, even if one was typed.
  .transform((d) => ({ ...d, phone: d.consentPhone ? d.phone : '' }))

export type SubscribeInput = z.infer<typeof subscribeSchema>
export type SubscribeFieldErrors = Partial<Record<'email' | 'name' | 'company' | 'consentEmail' | 'phone' | 'magnet', SubscribeErrorCode>>

export const unsubscribeSchema = z.object({
  email: emailField,
  company_url: z.string().max(0).optional().default(''),
})
export type UnsubscribeFieldErrors = Partial<Record<'email', SubscribeErrorCode>>

function collect<E extends Record<string, SubscribeErrorCode | undefined>>(issues: z.core.$ZodIssue[]): E {
  const errors: Record<string, SubscribeErrorCode> = {}
  for (const issue of issues) {
    const key = issue.path[0]
    if (typeof key !== 'string' || key === 'company_url' || errors[key]) continue
    const code = issue.message as SubscribeErrorCode
    errors[key] = subscribeCodes.includes(code) ? code : 'required'
  }
  return errors as E
}

export function validateSubscribe(
  raw: unknown,
): { ok: true; data: SubscribeInput } | { ok: false; errors: SubscribeFieldErrors } {
  const result = subscribeSchema.safeParse(raw)
  return result.success ? { ok: true, data: result.data } : { ok: false, errors: collect<SubscribeFieldErrors>(result.error.issues) }
}

export function validateUnsubscribe(
  raw: unknown,
): { ok: true; data: z.infer<typeof unsubscribeSchema> } | { ok: false; errors: UnsubscribeFieldErrors } {
  const result = unsubscribeSchema.safeParse(raw)
  return result.success ? { ok: true, data: result.data } : { ok: false, errors: collect<UnsubscribeFieldErrors>(result.error.issues) }
}
