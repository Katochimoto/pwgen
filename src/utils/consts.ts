const charSetGenerator = (min: number, max: number): string[] => {
  return [ ...Array(max - min + 1) ].map((_, idx) => String.fromCharCode(min + idx))
}

export const CharSet = {
  Symbols: Array.from('~!@#$%^&*()_+-=[]{}|;:\'",./<>?'),
  Numbers: charSetGenerator(48, 57),
  Alpha: [
    ...charSetGenerator(97, 122),
    ...charSetGenerator(65, 90),
  ],
}