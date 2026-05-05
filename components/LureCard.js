import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalizeImage } from "../src/utils/normalizeImage";

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
          source={normalizeImage(lure.imageUri)}
          style={styles.image}
        />
      )}

      <View style={styles.info}>
        {/* Nimi */}
        <Text style={styles.name}>{lure.name}</Text>

        {/* TYYPIT */}
        {Array.isArray(lure.type) && lure.type.length > 0 && (
          <InfoRow label="Tyyppi:">
            {lure.type.map((t) => (
              <Tag key={t} text={t} />
            ))}
          </InfoRow>
        )}

        {/* VÄRIT */}
        <InfoRow label="Värit:">
          {lure.color.map((c) => (
            <View
              key={c}
              style={[
                styles.colorBox,
                { backgroundColor: COLOR_MAP[c] || "#999" },
              ]}
            />
          ))}
        </InfoRow>

        {/* KOHDEKALAT */}
        {lure.targetFish?.length > 0 && (
          <InfoRow label="Kalat:">
            {lure.targetFish.map((fish) => (
              <Tag key={fish} text={fish} />
            ))}
          </InfoRow>
        )}

        {/* VESITYYPIT */}
        {lure.waterTypes?.length > 0 && (
          <InfoRow label="Vesityypit:">
            {lure.waterTypes.map((w) => (
              <Tag key={w} text={w} />
            ))}
          </InfoRow>
        )}
      </View>
    </TouchableOpacity>
  );
}


/* PIENET APUKOMPONENTIT */ 

function InfoRow({ label, children }) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.tagList}>{children}</View>
    </View>
  );
}

function Tag({ text }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

  /* TYYLIT */                    

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
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
});