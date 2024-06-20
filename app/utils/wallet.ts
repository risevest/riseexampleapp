export function isAddress(currentAddress: string): boolean {
  return !!currentAddress.match(/^(0x)?[0-9a-fA-F]{40}$/)
}
