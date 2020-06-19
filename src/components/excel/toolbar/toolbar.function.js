export function isButton(event) {
  return event.target.closest('[data-type="button"]')
}
