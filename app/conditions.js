import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import MultiSelectPicker from "../components/MultiSelectPicker";
import { getWeatherByCoords } from "../src/api/weather";
import { globalStyles } from "../src/styles";

// Valintalistat
const WATER_COLOR_OPTIONS = ["kirkas", "samea", "ruskea"];
const FISH_OPTIONS = ["hauki", "ahven", "kuha", "lohi"];
const WEATHER_OPTIONS = ["aurinkoinen", "pilvinen", "sateinen"];
const WATER_TYPE_OPTIONS = ["lampi", "järvi", "joki", "meri"];

export default function Conditions() {
  // Yksivalintaiset listat (MultiSelectPicker antaa listan)
  const [waterColor, setWaterColor] = useState([]);
  const [targetFish, setTargetFish] = useState([]);
  const [weather, setWeather] = useState([]);
  const [waterType, setWaterType] = useState([]);
  const [temp, setTemp] = useState(null);

  async function fetchWeatherFromLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Sijaintilupaa ei myönnetty.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    if (!loc?.coords) {
      alert("Sijaintia ei saatu.");
      return;
    }

    const { latitude, longitude } = loc.coords;
    const data = await getWeatherByCoords(latitude, longitude);

    const w = data.weather?.[0]?.main?.toLowerCase() || "";
    const t = data.main?.temp ?? null;

    setTemp(t);

    if (w.includes("rain")) setWeather(["sateinen"]);
    else if (w.includes("cloud")) setWeather(["pilvinen"]);
    else setWeather(["aurinkoinen"]);
  }

  function onNext() {
    router.push({
      pathname: "/result",
      params: {
        waterColor: waterColor[0] ?? "",
        targetFish: targetFish[0] ?? "",
        weather: weather[0] ?? "",
        waterType: waterType[0] ?? "",
        temp: temp ?? "",
      },
    });
  }

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

        {/* VALEA BOXI ALKAA */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            padding: 16,
            borderRadius: 12,
            marginBottom: 30,
            width: "100%",
          }}
        >

          {/* Veden väri */}
          <MultiSelectPicker
            title="Veden väri"
            options={WATER_COLOR_OPTIONS}
            values={waterColor}
            onChange={(v) => setWaterColor([v[v.length - 1]])}
          />

          {/* Kohdekala */}
          <MultiSelectPicker
            title="Kohdekala"
            options={FISH_OPTIONS}
            values={targetFish}
            onChange={(v) => setTargetFish([v[v.length - 1]])}
          />

          {/* Sää */}
          <MultiSelectPicker
            title="Sää"
            options={WEATHER_OPTIONS}
            values={weather}
            onChange={(v) => setWeather([v[v.length - 1]])}
          />

          {/* Vesistön tyyppi */}
          <MultiSelectPicker
            title="Vesistön tyyppi"
            options={WATER_TYPE_OPTIONS}
            values={waterType}
            onChange={(v) => setWaterType([v[v.length - 1]])}
          />

          {/* Lämpötila */}
          {temp !== null && (
            <Text style={[globalStyles.text, { color: "#000" }]}>
              Lämpötila: {temp.toFixed(1)} °C
            </Text>
          )}

          {/* Sääpainike */}
          <Pressable
            onPress={fetchWeatherFromLocation}
            style={{
              backgroundColor: "#ffffffcc",
              padding: 12,
              borderRadius: 8,
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Hae säätiedot sijainnista</Text>
          </Pressable>

          {/* Etsi paras uistin */}
          <Pressable
            onPress={onNext}
            style={{
              backgroundColor: "#ffffffcc",
              padding: 12,
              borderRadius: 8,
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Etsi paras uistin</Text>
          </Pressable>

        </View>
        {/* VALEA BOXI LOPPUU */}

      </ScrollView>
    </ImageBackground>
  );
}