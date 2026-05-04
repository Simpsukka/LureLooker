import {
  scoreMatches,
  typeRules,
  waterColorRules,
  waterTypeRules,
  weatherRules,
} from "../logic/rules";

export function scoreLure(lure, targetFish, waterColor, weather) {
  let score = 0;
  let explanation = [];

  /* -----------------------------
     1. Kohdekala
  ----------------------------- */
  if (targetFish) {
    if (lure.targetFish.includes(targetFish)) {
      score += 30;
      explanation.push({
        type: "fish",
        text: `Uistin sopii hyvin kohdekalalle (${targetFish}).`,
      });
    } else {
      explanation.push({
        type: "fish",
        text: `Uistin ei ole erityisesti suunnattu kalalle (${targetFish}).`,
      });
    }
  }

  /* -----------------------------
     2. Veden väri
  ----------------------------- */
  if (waterColor) {
    const matches = lure.color.filter((c) =>
      waterColorRules[waterColor]?.includes(c)
    );

    if (matches.length > 0) {
      const bonus = scoreMatches(matches, 8);
      score += bonus;

      explanation.push({
        type: "color",
        text: `Veden väri (${waterColor}) suosii värejä: ${matches.join(", ")}.`,
      });
    } else {
      explanation.push({
        type: "color",
        text: `Veden väri (${waterColor}) ei erityisesti tue uistimen värejä.`,
      });
    }
  }

  /* -----------------------------
     3. Sää
  ----------------------------- */
  if (weather) {
    const matches = lure.color.filter((c) =>
      weatherRules[weather]?.includes(c)
    );

    if (matches.length > 0) {
      const bonus = scoreMatches(matches, 6);
      score += bonus;

      explanation.push({
        type: "weather",
        text: `Sää (${weather}) suosii värejä: ${matches.join(", ")}.`,
      });
    } else {
      explanation.push({
        type: "weather",
        text: `Sää (${weather}) ei erityisesti tue uistimen värejä.`,
      });
    }
  }

  /* -----------------------------
     4. Uistimen tyyppi
  ----------------------------- */
  if (Array.isArray(lure.type)) {
    const matches = lure.type.filter((t) => typeRules.includes(t));

    if (matches.length > 0) {
      const bonus = scoreMatches(matches, 10);
      score += bonus;

      explanation.push({
        type: "type",
        text: `Uistimen tyyppi sopii olosuhteisiin: ${matches.join(", ")}.`,
      });
    }
  }

  /* -----------------------------
     5. Vesityyppi + kohdekala
  ----------------------------- */
  if (targetFish) {
    for (const [water, fishList] of Object.entries(waterTypeRules)) {
      if (lure.waterTypes.includes(water) && fishList.includes(targetFish)) {
        score += 10;
        explanation.push({
          type: "water",
          text: `Uistin sopii hyvin vesityyppiin (${water}) ja kalalle (${targetFish}).`,
        });
      }
    }
  }

  /* -----------------------------
     6. Monivärisyys
  ----------------------------- */
  if (lure.color.length >= 3) {
    score += 5;
    explanation.push({
      type: "general",
      text: "Monivärinen uistin voi olla houkuttelevampi.",
    });
  }

  return { score, explanation };
}