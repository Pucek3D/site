import { z } from 'zod'

/**
 * One schema shared by the browser and the API route, so the two can never
 * disagree about what a valid inquiry is. Messages are CODES, not sentences:
 * each side maps them to the reader's language.
 */
export const topics = ['agency', 'brand', 'training', 'general'] as const
export type Topic = (typeof topics)[number]

export const formLanguages = ['en', 'pl', 'de'] as const

export type ErrorCode = 'required' | 'email' | 'url' | 'consent' | 'tooShort' | 'tooLong'

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
    consent: z.literal(true, { error: 'consent' }),
    // Honeypot: real people never see or fill this.
    company_url: z.string().max(0).optional().default(''),

  })

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
      errors[key] = (['required', 'email', 'url', 'consent', 'tooShort', 'tooLong'] as const).includes(code)
        ? code
        : 'required'
    }
  }
  return { ok: false, errors }
}
