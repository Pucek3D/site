/**
 * Feature flag for the consent sign-up flow. Off unless SUBSCRIBE_ENABLED is exactly "true".
 * When off, /subscribe, /subscribe/confirm, /unsubscribe and their APIs return 404 and
 * the footer link is not rendered. The footer is part of statically built pages, so set
 * the flag BEFORE the production build.
 */
export function subscribeEnabled(): boolean {
  return process.env.SUBSCRIBE_ENABLED === 'true'
}
