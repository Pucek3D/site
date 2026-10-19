import { z } from 'zod'

/**
 * One schema shared by the browser and the API route, so the two can never
 * disagree about what a valid inquiry is. Messages are CODES, not sentences:
 * each side maps them to the reader's language.
 */
export const topics = ['agency', 'brand', 'training', 'general'] as const
export type Topic = (typeof topics)[number]

export const formLanguages = ['en', 'pl', 'de'] as const

export const agencyTypes = ['full-service', 'performance', 'ecommerce', 'creative', 'other'] as const
export const clientCounts = ['1', '2-5', '6-15', '16+'] as const
export const capabilityLevels = ['none', 'basic', 'established', 'advanced'] as const
export const agencyModels = ['white-label', 'co-delivery', 'training', 'not-sure'] as const

export const marketplaces = ['us', 'ca', 'uk', 'de', 'other-eu', 'other'] as const
export const asinCounts = ['1', '2-5', '6-20', '21+'] as const
export const brandProblems = [
  'traffic',
  'positioning',
  'content',
  'conversion',
  'workflow',
  'capability',
  'not-sure',
] as const

export const teamSizes = ['1-5', '6-12', '13-25', '26+'] as const
export const trainingFormats = ['remote', 'onsite', 'hybrid', 'not-sure'] as const
export const timings = ['month', 'quarter', 'half-year', 'exploring'] as const

export type ErrorCode = 'required' | 'email' | 'url' | 'consent' | 'tooShort' | 'tooLong'

const text = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')
const optionalText = (max: number) => z.string().trim().max(max, 'tooLong').optional().default('')
const choice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { error: 'required' })

const conditional = {
  agency: ['agencyType', 'clientCount', 'capability', 'agencyModel'],
  brand: ['category', 'marketplace', 'asinCount', 'brandProblem'],
  training: ['teamSize', 'participantRoles', 'capabilityToBuild', 'trainingFormat', 'timing'],
  general: [],
} as const satisfies Record<Topic, readonly string[]>

export const contactSchema = z
  .object({
    topic: choice(topics),
    name: text(120),
    email: z.string().trim().min(1, 'required').max(200, 'tooLong').pipe(z.email('email')),
    company: text(160),
    role: text(120),
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

    agencyType: optionalText(40),
    clientCount: optionalText(20),
    capability: optionalText(40),
    agencyModel: optionalText(40),
    category: optionalText(160),
    marketplace: optionalText(40),
    asinCount: optionalText(20),
    brandProblem: optionalText(40),
    teamSize: optionalText(20),
    participantRoles: optionalText(300),
    capabilityToBuild: optionalText(1000),
    trainingFormat: optionalText(40),
    timing: optionalText(40),
  })
  .superRefine((data, ctx) => {
    for (const field of conditional[data.topic]) {
      if (!data[field]) ctx.addIssue({ code: 'custom', path: [field], message: 'required' })
    }
  })

export type ContactInput = z.infer<typeof contactSchema>
export type FieldErrors = Partial<Record<keyof ContactInput, ErrorCode>>

export function conditionalFields(topic: Topic): readonly string[] {
  return conditional[topic]
}

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
