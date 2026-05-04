export function validateLure({ name, type, color }) {
  if (!name || !name.trim()) {
    return "Anna uistimelle nimi.";
  }

  if (!Array.isArray(type) || type.length === 0) {
    return "Valitse vähintään yksi uistimen tyyppi.";
  }

  if (!Array.isArray(color) || color.length === 0) {
    return "Valitse vähintään yksi väri.";
  }

  return null; // ei virheitä
}