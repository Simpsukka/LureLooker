import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function LureCard({ lure, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>

      {/* KUVA */}
      {lure.imageUri && (
        <Image
          source={
            typeof lure.imageUri === "string"
              ? { uri: lure.imageUri }
              : lure.imageUri
          }
          style={styles.image}
        />
      )}

      <View style={styles.info}>
        {/* Nimi */}
        <Text style={styles.name}>{lure.name}</Text>

        {/* TYYPIT (tag-tyyli) */}
        {Array.isArray(lure.type) && lure.type.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.text}>Tyyppi:</Text>
            <View style={styles.tagList}>
              {lure.type.map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* VÄRIT */}
        <View style={styles.row}>
          <Text style={styles.text}>Värit:</Text>
          <View style={styles.colorList}>
            {lure.color.map((c) => (
              <View
                key={c}
                style={[
                  styles.colorBox,
                  { backgroundColor: COLOR_MAP[c] || "#999" },
                ]}
              />
            ))}
          </View>
        </View>

        {/* KOHDEKALAT */}
        {lure.targetFish?.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.text}>Kalat:</Text>
            <View style={styles.tagList}>
              {lure.targetFish.map((fish) => (
                <View key={fish} style={styles.tag}>
                  <Text style={styles.tagText}>{fish}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* VESITYYPIT */}
        {lure.waterTypes?.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.text}>Vesityypit:</Text>
            <View style={styles.tagList}>
              {lure.waterTypes.map((w) => (
                <View key={w} style={styles.tag}>
                  <Text style={styles.tagText}>{w}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 14,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  text: {
    color: "#ddd",
    fontSize: 14,
    marginRight: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  colorList: {
    flexDirection: "row",
    marginLeft: 6,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 6,
  },
  tag: {
    backgroundColor: "#ffffff33",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
});
