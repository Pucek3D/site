import { createCipheriv, createDecipheriv, createHash, hkdfSync, randomBytes } from 'node:crypto'

/**
 * Stateless, encrypted and authenticated tokens (AES-256-GCM). There is no
 * database: a sign-up waits inside its confirmation token until the person
 * confirms, so the token itself must be unreadable and tamper-proof.
 *
 * Format: base64url( version(1) | iv(12) | ciphertext | tag(16) ).
 * The key is derived with HKDF-SHA256 from CONSENT_TOKEN_SECRET (min 32 chars).
 * The token kind is bound as GCM additional data, so a token of one kind can
 * never be accepted as another.
 *
 * Pure module (node:crypto only) so scripts/check-consent.mjs can exercise it.
 */

export const SIGNUP_TOKEN_TTL_MS = 48 * 60 * 60 * 1000
export const MIN_SECRET_LENGTH = 32

const VERSION = 1
const IV_BYTES = 12
const TAG_BYTES = 16

export type TokenKind = 'signup' | 'unsubscribe'
type Envelope<T> = { k: TokenKind; iat: number; exp: number | null; d: T }

export type OpenResult<T> =
  | { ok: true; data: T; issuedAt: number }
  | { ok: false; reason: 'no_secret' | 'invalid' | 'expired' }

function key(): Buffer | null {
  const secret = process.env.CONSENT_TOKEN_SECRET
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null
  return Buffer.from(hkdfSync('sha256', secret, 'adelier-consent-token', `consent-token-v${VERSION}`, 32))
}

export function tokenSecretConfigured() {
  return key() !== null
}

export function sealToken<T>(kind: TokenKind, data: T, opts: { now?: number; ttlMs?: number | null } = {}): string {
  const k = key()
  if (!k) throw Object.assign(new Error('consent token secret missing'), { code: 'NO_SECRET' })
  const now = opts.now ?? Date.now()
  const ttl = opts.ttlMs === undefined ? (kind === 'signup' ? SIGNUP_TOKEN_TTL_MS : null) : opts.ttlMs
  const envelope: Envelope<T> = { k: kind, iat: now, exp: ttl === null ? null : now + ttl, d: data }
  const iv = randomBytes(IV_BYTES)
  const cipher = createCipheriv('aes-256-gcm', k, iv)
  cipher.setAAD(Buffer.from(`${VERSION}:${kind}`))
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(envelope), 'utf8'), cipher.final()])
  return Buffer.concat([Buffer.from([VERSION]), iv, ciphertext, cipher.getAuthTag()]).toString('base64url')
}

export function openToken<T>(kind: TokenKind, token: unknown, opts: { now?: number } = {}): OpenResult<T> {
  const k = key()
  if (!k) return { ok: false, reason: 'no_secret' }
  if (typeof token !== 'string' || token.length > 8192 || !/^[A-Za-z0-9_-]+$/.test(token)) return { ok: false, reason: 'invalid' }
  try {
    const buf = Buffer.from(token, 'base64url')
    if (buf.length < 1 + IV_BYTES + TAG_BYTES + 1 || buf[0] !== VERSION) return { ok: false, reason: 'invalid' }
    const iv = buf.subarray(1, 1 + IV_BYTES)
    const tag = buf.subarray(buf.length - TAG_BYTES)
    const ciphertext = buf.subarray(1 + IV_BYTES, buf.length - TAG_BYTES)
    const decipher = createDecipheriv('aes-256-gcm', k, iv)
    decipher.setAAD(Buffer.from(`${VERSION}:${kind}`))
    decipher.setAuthTag(tag)
    const envelope = JSON.parse(Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')) as Envelope<T>
    if (envelope.k !== kind) return { ok: false, reason: 'invalid' }
    if (envelope.exp !== null && (opts.now ?? Date.now()) > envelope.exp) return { ok: false, reason: 'expired' }
    return { ok: true, data: envelope.d, issuedAt: envelope.iat }
  } catch {
    // Wrong key, altered bytes or a malformed payload: all are simply "invalid".
    return { ok: false, reason: 'invalid' }
  }
}

/** The register's de-duplication key. A hash, so the register never holds a usable token. */
export function idempotencyKeyFor(token: string) {
  return createHash('sha256').update(token).digest('hex')
}
