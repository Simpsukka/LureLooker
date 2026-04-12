import * as SecureStore from "expo-secure-store";
import { TEST_LURES } from "../data/TEST_LURES";

const LURES_KEY = "lures";

// Apufunktiot JSON-datan tallennukseen
async function saveJSON(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.warn("SecureStore save error:", e);
  }
}

async function loadJSON(key) {
  try {
    const json = await SecureStore.getItemAsync(key);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.warn("SecureStore load error:", e);
    return null;
  }
}

// Puhdistetaan uistin vain sallittuihin kenttiin
function cleanLure(l) {
  return {
    id: l.id,
    name: l.name,
    imageUri: l.imageUri || null,
    type: l.type || "",
    color: Array.isArray(l.color) ? l.color : [],
    targetFish: Array.isArray(l.targetFish) ? l.targetFish : [],
    waterTypes: Array.isArray(l.waterTypes) ? l.waterTypes : [],
  };
}

// Hae kaikki uistimet
export async function getLures() {
  // 1) Yritä ladata tallennettu data
  const stored = await loadJSON(LURES_KEY);

  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored.map(cleanLure);
  }

  // 2) Jos ei ole tallennettua dataa → käytä TEST_LURES
  return TEST_LURES.map(cleanLure);
}

// Tallenna koko lista
export async function saveLures(lures) {
  try {
    const cleaned = lures.map(cleanLure);
    await saveJSON(LURES_KEY, cleaned);
  } catch (e) {
    console.warn("Error saving lures", e);
  }
}

// Poista uistin
export async function deleteLure(id) {
  try {
    const lures = await getLures();
    const filtered = lures.filter((l) => l.id !== id);
    await saveLures(filtered);
  } catch (e) {
    console.warn("Error deleting lure", e);
  }
}