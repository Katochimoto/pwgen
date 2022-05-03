import { CharSet } from './consts'
import rnd from './rnd'

interface PwgenOptions {
  symbols?: boolean
  numbers?: boolean
  len: number
}

export default function pwgen ({
  symbols,
  numbers,
  len,
}: PwgenOptions): string {
  const sets = [ CharSet.Alpha ]
  if (symbols) sets.push(CharSet.Symbols)
  if (numbers) sets.push(CharSet.Numbers)

  const acc = []
  for (let i = 0; i < len; i++) {
    const set = sets[rnd(0, sets.length - 1)]
    const idx = rnd(0, set.length - 1)
    acc.push(set[idx])
  }

  if (symbols || numbers) {
    let hasSymbols
    let hasNumbers
    while (!hasSymbols && !hasNumbers) {
      hasSymbols = !symbols
      hasNumbers = !numbers
      for (let i = 0; i < acc.length; i++) {
        const c = acc[i]
        if (symbols && CharSet.Symbols.includes(c)) hasSymbols = true
        if (numbers && CharSet.Numbers.includes(c)) hasNumbers = true
      }
      if (!hasSymbols) {
        acc[rnd(0, acc.length - 1)] = CharSet.Symbols[rnd(0, CharSet.Symbols.length - 1)]
      }
      if (!hasNumbers) {
        acc[rnd(0, acc.length - 1)] = CharSet.Numbers[rnd(0, CharSet.Numbers.length - 1)]
      }
    }
  }

  return acc.join('')
}
