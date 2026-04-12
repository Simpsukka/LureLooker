// Värisäännöt veden värin mukaan
export const colorRules = {
  kirkas: ['luonnollinen', 'hopea', 'ruskea'],
  vihertävä: ['kulta', 'vihreä', 'luonnollinen'],
  samea: ['kirkas', 'oranssi', 'punainen'],
  tumma: ['musta', 'violetti', 'sininen'],
};

// Palauttaa 20 pistettä jos väri sopii veden väriin
export function scoreColorMatch(lureColor, waterColor) {
  const list = colorRules[waterColor] || [];
  return list.includes(lureColor) ? 20 : 0;
}s
