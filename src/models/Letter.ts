export function isLetter(character: string): boolean {
  return character.length === 1 && character.toLowerCase() !== character.toUpperCase()
}