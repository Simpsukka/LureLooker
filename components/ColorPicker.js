import { Pressable, Text, View } from "react-native";

const AVAILABLE_COLORS = [
  "punainen",
  "sininen",
  "vihreä",
  "keltainen",
  "oranssi",
  "pinkki",
  "musta",
  "hopea",
  "kulta",
];

// Pieni apufunktio värien taustaväreille
const COLOR_MAP = {
  punainen: "#d62828",
  sininen: "#1d4ed8",
  vihreä: "#15803d",
  keltainen: "#eab308",
  oranssi: "#f97316",
  pinkki: "#ec4899",
  musta: "#000000",
  hopea: "#c0c0c0",
  kulta: "#d4af37",
};

export default function ColorPicker({ values, onChange }) {
  function toggleColor(color) {
    if (values.includes(color)) {
      onChange(values.filter((c) => c !== color));
    } else {
      onChange([...values, color]);
    }
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>Värit</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {AVAILABLE_COLORS.map((color) => {
          const selected = values.includes(color);

          return (
            <Pressable
              key={color}
              onPress={() => toggleColor(color)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                margin: 4,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: selected ? "#1040dd" : "#ccc",
                backgroundColor: selected ? "#1040dd22" : "#ffffffaa",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Värilaatikko */}
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  backgroundColor: COLOR_MAP[color],
                  marginRight: 6,
                }}
              />

              <Text>{color}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}