import { CharSet } from './consts'
import rnd from './rnd'

interface PwgenOptions {
  symbols: boolean
  numbers: boolean
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

  return acc.join('')
}
