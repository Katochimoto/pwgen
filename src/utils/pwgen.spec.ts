import { CharSet } from './consts'
import pwgen from './pwgen'

describe('pwgen', () => {
  it('Must contain symbols if option "symbols" is true', () => {
    expect(pwgen({ symbols: true, len: 1 })).toBeOneOf(CharSet.Symbols)
  })

  it('Must contain numbers if option "numbers" is true', () => {
    expect(pwgen({ numbers: true, len: 1 })).toBeOneOf(CharSet.Numbers)
  })

  it('Must contain alpha if options "numbers" and "symbols" are false', () => {
    expect(pwgen({ len: 1 })).toBeOneOf(CharSet.Alpha)
  })
})