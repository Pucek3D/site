/**
 * Names that stay in English in every locale (brief: company, descriptor,
 * product names, program names, stage labels, mode names). Held once here so
 * no locale file can drift from them.
 */
export const productIds = ['diagnostic', 'sprint', 'pod', 'foundations', 'enablement'] as const
export type ProductId = (typeof productIds)[number]

export const productNames: Record<ProductId, string> = {
  diagnostic: 'Marketplace Growth Diagnostic',
  sprint: 'Position-to-Conversion Sprint',
  pod: 'White-Label Listing and Conversion Pod',
  foundations: 'Amazon Conversion Foundations',
  enablement: 'Agency Marketplace Enablement',
}

export const familyNames = {
  delivery: 'Marketplace Delivery',
  training: 'Training and Team Enablement',
} as const
export type FamilyId = keyof typeof familyNames

export const productFamily: Record<ProductId, FamilyId> = {
  diagnostic: 'delivery',
  sprint: 'delivery',
  pod: 'delivery',
  foundations: 'training',
  enablement: 'training',
}

export const programIds = ['foundations', 'enablement'] as const satisfies readonly ProductId[]

export const stageNames = ['Diagnose', 'Position', 'Build', 'Validate', 'Enable', 'Scale'] as const

export const modeNames = ['ADelier Delivers', 'ADelier Co-builds', 'ADelier Enables'] as const

export const learningSteps = ['Learn', 'Apply', 'Review', 'Repeat'] as const
