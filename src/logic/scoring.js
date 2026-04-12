export function scoreLure(lure, targetFish, waterColor, weather) {
  let score = 0;
  let explanation = [];


  //Kohdekala

  if (targetFish) {
    if (lure.targetFish.includes(targetFish)) {
      score += 30;
      explanation.push({
        type: "fish",
        text: `Uistin sopii hyvin kohdekalalle (${targetFish}).`
      });
    } else {
      explanation.push({
        type: "fish",
        text: `Uistin ei ole erityisesti suunnattu kalalle (${targetFish}).`
      });
    }
  }

 
  //Veden väri
  
  const colorMatch = {
    samea: ["musta", "oranssi", "keltainen", "pinkki"],
    kirkas: ["hopea", "sininen", "vihreä"],
    ruskea: ["kulta", "oranssi", "musta"],
  };

  if (waterColor) {
    const matches = lure.color.filter((c) =>
      colorMatch[waterColor]?.includes(c)
    );

    if (matches.length > 0) {
      const bonus = matches.length * 8; // skaalautuva
      score += bonus;

      explanation.push({
        type: "color",
        text: `Veden väri (${waterColor}) suosii värejä: ${matches.join(", ")}.`
      });
    } else {
      explanation.push({
        type: "color",
        text: `Veden väri (${waterColor}) ei erityisesti tue uistimen värejä.`
      });
    }
  }

  
  // Sää

  const weatherBonus = {
    aurinkoinen: ["hopea", "kulta", "sininen"],
    pilvinen: ["musta", "vihreä", "oranssi"],
    sateinen: ["keltainen", "pinkki", "hopea"],
  };

  if (weather) {
    const matches = lure.color.filter((c) =>
      weatherBonus[weather]?.includes(c)
    );

    if (matches.length > 0) {
      const bonus = matches.length * 6; // skaalautuva
      score += bonus;

      explanation.push({
        type: "weather",
        text: `Sää (${weather}) suosii värejä: ${matches.join(", ")}.`
      });
    } else {
      explanation.push({
        type: "weather",
        text: `Sää (${weather}) ei erityisesti tue uistimen värejä.`
      });
    }
  }

  
  // Uistimen tyyppi ( UUSI SKAALAUTUVA LOGIIKKA)
  if (Array.isArray(lure.type) && lure.type.length > 0) {
    const typeMatches = lure.type.filter((t) =>
      ["jigi", "lippa", "vaappu", "lusikka"].includes(t)
    );

    if (typeMatches.length > 0) {
      const bonus = typeMatches.length * 10; // skaalautuva
      score += bonus;

      explanation.push({
        type: "type",
        text: `Uistimen tyyppi sopii olosuhteisiin: ${typeMatches.join(", ")}.`
      });
    }
  }

 
  //Vesityyppi + kohdekala
 
  if (targetFish) {
    if (lure.waterTypes.includes("meri") && targetFish === "lohi") {
      score += 10;
      explanation.push({
        type: "water",
      });
    }

    if (lure.waterTypes.includes("järvi") && ["kuha", "ahven", "hauki"].includes(targetFish)) {
      score += 10;
      explanation.push({
        type: "water",
      });
    }

    if (lure.waterTypes.includes("joki") && ["lohi", "taimen"].includes(targetFish)) {
      score += 10;
      explanation.push({
        type: "water",
      });
    }
  }

  
  //Monivärisyys

  if (lure.color.length >= 3) {
    score += 5;
    explanation.push({
      type: "general",
      text: "Monivärinen uistin voi olla houkuttelevampi."
    });
  }

  return { score, explanation };
}
