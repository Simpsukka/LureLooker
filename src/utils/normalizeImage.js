// Palauttaa oikean React Native image source -muodon
export function normalizeImage(imageUri) {
  if (!imageUri) return null;

  // Jos kuva on jo require(...) → palautetaan sellaisenaan
  if (typeof imageUri !== "string") {
    return imageUri;
  }

  // Muuten oletetaan, että se on URI
  return { uri: imageUri };
}