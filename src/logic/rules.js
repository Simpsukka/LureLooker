// Veden värin suosimat värit
export const waterColorRules = {
  kirkas: ["hopea", "sininen", "vihreä"],
  samea: ["musta", "oranssi", "keltainen", "pinkki"],
  ruskea: ["kulta", "oranssi", "musta"],
};

// Sään suosimat värit
export const weatherRules = {
  aurinkoinen: ["hopea", "kulta", "sininen"],
  pilvinen: ["musta", "vihreä", "oranssi"],
  sateinen: ["keltainen", "pinkki", "hopea"],
};

// Hyväksytyt uistintyypit
export const typeRules = ["jigi", "lippa", "vaappu", "lusikka"];

// Vesityyppi + kohdekala -säännöt
export const waterTypeRules = {
  meri: ["lohi", "taimen"],
  järvi: ["kuha", "ahven", "hauki"],
  joki: ["lohi", "taimen"],
  lampi: ["ahven", "hauki"],
};

// Yhteinen skaalautuva pisteytysfunktio
export function scoreMatches(matches, multiplier) {
  return matches.length * multiplier;
}