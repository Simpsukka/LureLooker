import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

import { scoreLure } from "../src/logic/scoring";
import { getLures } from "../src/storage/lureStorage";
import { globalStyles } from "../src/styles";
import { normalizeImage } from "../src/utils/normalizeImage";


export default function Result() {
  const params = useLocalSearchParams();
  const [top3, setTop3] = useState(null);

  useEffect(() => {
    async function calculateResults() {
      const lures = await getLures();

      if (!lures || lures.length === 0) {
        setTop3([]);
        return;
      }

      // Laske pisteet jokaiselle uistimelle
      const scored = lures.map((lure) => {
        const { score } = scoreLure(
          lure,
          params.targetFish || null,
          params.waterColor || null,
          params.weather || null
        );
        return { lure, score };
      });

      // Järjestä parhaat
      const sorted = scored.sort((a, b) => b.score - a.score);
      const bestThree = sorted.slice(0, 3);

      setTop3(bestThree);

      if (bestThree.length > 0) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }

    calculateResults();
  }, []);

  // Ei löytynyt yhtään sopivaa uistinta
  if (!top3 || top3.length === 0) {
    return (
      <ImageBackground
        source={require("../assets/images/sea.jpg")}
        style={globalStyles.backgroundImage}
      >
        <View style={globalStyles.backgroundOverlay} pointerEvents="none" />

        <View style={globalStyles.topRightIcon}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={36}
            color="#1040dd"
            onPress={() => router.push("/")}
          />
        </View>

        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text style={[globalStyles.text, { color: "#000" }]}>
              Ei löytynyt sopivaa uistinta.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  const best = top3[0];

  return (
    <ImageBackground
      source={require("../assets/images/sea.jpg")}
      style={globalStyles.backgroundImage}
    >
      <View style={globalStyles.backgroundOverlay} pointerEvents="none" />

      {/* Takaisin */}
      <View style={globalStyles.topRightIcon}>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={36}
          color="#1040dd"
          onPress={() => router.push("/")}
        />
      </View>

      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            padding: 16,
            borderRadius: 12,
            marginBottom: 30,
          }}
        >
          {/* Paras uistin */}
          <Text style={[globalStyles.title, { color: "#000" }]}>
            Paras uistin: {best.lure.name}
          </Text>

          {best.lure.imageUri && (
            <Image
              source={normalizeImage(best.lure.imageUri)}
              style={globalStyles.image}
            />
          )}

          <Text style={[globalStyles.text, { color: "#000", marginBottom: 20 }]}>
            Pisteet: {best.score}
          </Text>

          {/* TOP 3 */}
          <View style={{ marginTop: 10 }}>
            <Text style={[globalStyles.title, { color: "#000" }]}>
              Top 3 uistimet
            </Text>

            {top3.map((item, index) => (
              <View key={item.lure.id} style={{ marginVertical: 10 }}>
                <Text style={[globalStyles.text, { color: "#000" }]}>
                  {index + 1}. {item.lure.name} — {item.score} pistettä
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}