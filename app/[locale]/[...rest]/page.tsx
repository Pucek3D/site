import { notFound } from 'next/navigation'

// Unknown paths under a locale render that locale's not-found page inside the site chrome.
export default function CatchAll() {
  notFound()
}
