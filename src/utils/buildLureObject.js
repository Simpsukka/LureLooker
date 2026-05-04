export function buildLureObject({
  id,
  name,
  imageUri,
  type,
  color,
  targetFish,
  waterTypes,
}) {
  return {
    id: String(id),
    name: name.trim(),
    imageUri: imageUri || null,
    type: Array.isArray(type) ? type : [],
    color: Array.isArray(color) ? color : [],
    targetFish: Array.isArray(targetFish) ? targetFish : [],
    waterTypes: Array.isArray(waterTypes) ? waterTypes : [],
  };
}