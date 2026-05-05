import * as SecureStore from "expo-secure-store";
import { TEST_LURES } from "../data/TEST_LURES";

const LURES_KEY = "lures";

/* JSON-apufunktiot */

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

/* cleanLure varmistaa datan oikean muodon */

function cleanLure(l) {
  return {
    id: String(l.id),
    name: l.name || "",
    imageUri: l.imageUri || null,
    type: Array.isArray(l.type) ? l.type : [],
    color: Array.isArray(l.color) ? l.color : [],
    targetFish: Array.isArray(l.targetFish) ? l.targetFish : [],
    waterTypes: Array.isArray(l.waterTypes) ? l.waterTypes : [],
  };
}

/* getLures lataa tallennetut uistimet */

export async function getLures() {
  const stored = await loadJSON(LURES_KEY);

  // Jos tallennettua dataa löytyy → käytä sitä
  if (Array.isArray(stored) && stored.length > 0) {
    return stored.map(cleanLure);
  }

  // Muuten käytetään TEST_LURES
  return TEST_LURES.map(cleanLure);
}

/* saveLures tallentaa koko listan */

export async function saveLures(lures) {
  try {
    const cleaned = lures.map(cleanLure);
    await saveJSON(LURES_KEY, cleaned);
  } catch (e) {
    console.warn("Error saving lures", e);
  }
}

/* deleteLure poistaa yhden uistimen */

export async function deleteLure(id) {
  try {
    const lures = await getLures();
    const filtered = lures.filter((l) => String(l.id) !== String(id));
    await saveLures(filtered);
  } catch (e) {
    console.warn("Error deleting lure", e);
  }
}