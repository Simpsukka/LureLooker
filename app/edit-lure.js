import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import ColorPicker from "../components/ColorPicker";
import MultiSelectPicker from "../components/MultiSelectPicker";
import { useLureContext } from "../src/context/LureContext";
import { globalStyles } from "../src/styles";

// Uudet apufunktiot
import { buildLureObject } from "../src/utils/buildLureObject";
import { normalizeImage } from "../src/utils/normalizeImage";
import { validateLure } from "../src/utils/validateLure";

const FISH_OPTIONS = ["hauki", "ahven", "kuha", "lohi", "taimen"];
const WATER_OPTIONS = ["järvi", "joki", "meri", "lampi"];
const TYPE_OPTIONS = ["jigi", "lippa", "vaappu", "lusikka"];

export default function EditLure() {
  const { id } = useLocalSearchParams();
  const lureId = String(id);

  const { lures, addLure, deleteLure } = useLureContext();
  const existing = lures.find((l) => String(l.id) === lureId);

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [colors, setColors] = useState([]);
  const [type, setType] = useState([]);
  const [targetFish, setTargetFish] = useState([]);
  const [waterTypes, setWaterTypes] = useState([]);

  useEffect(() => {
    if (existing) {
      setImageUri(existing.imageUri || null);
      setName(existing.name || "");
      setColors(existing.color || []);
      setType(existing.type || []);
      setTargetFish(existing.targetFish || []);
      setWaterTypes(existing.waterTypes || []);
    }
  }, [existing]);

  async function pickImage() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Kameran käyttö vaatii luvan.");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
    }
  }

  async function onSave() {
    if (!existing) {
      alert("Uistinta ei löytynyt.");
      return;
    }

    // Yhteinen validointi
    const error = validateLure({ name, type, color: colors });
    if (error) {
      alert(error);
      return;
    }

    // Rakennetaan päivitetty uistinobjekti
    const updated = buildLureObject({
      id: lureId,
      name,
      imageUri,
      type,
      color: colors,
      targetFish,
      waterTypes,
    });

    await addLure(updated);
    router.push("/");
  }

  async function onDelete() {
    if (!existing) {
      alert("Uistinta ei löytynyt.");
      return;
    }

    await deleteLure(lureId);
    router.push("/");
  }

  if (!existing) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Uistinta ei löytynyt.</Text>
      </View>
    );
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

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            padding: 16,
            borderRadius: 12,
            marginBottom: 30,
            width: "100%",
          }}
        >
          {/* KUVA */}
          {imageUri && (
            <Image
              source={normalizeImage(imageUri)}
              style={{
                width: 160,
                height: 160,
                borderRadius: 12,
                alignSelf: "center",
                marginBottom: 10,
                marginTop: 10,
              }}
            />
          )}

          {/* Vaihda kuva */}
          <Pressable
            onPress={pickImage}
            style={{
              backgroundColor: "#ffffffcc",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Vaihda kuva</Text>
          </Pressable>

          {/* Nimi */}
          <Text style={[globalStyles.text, { color: "#000" }]}>Nimi</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={globalStyles.input}
          />

          {/* Värit */}
          <ColorPicker values={colors} onChange={setColors} />

          {/* Uistimen tyyppi */}
          <MultiSelectPicker
            title="Uistimen tyyppi"
            options={TYPE_OPTIONS}
            values={type}
            onChange={setType}
          />

          {/* Kohdekalat */}
          <MultiSelectPicker
            title="Kohdekalat"
            options={FISH_OPTIONS}
            values={targetFish}
            onChange={setTargetFish}
          />

          {/* Vesityypit */}
          <MultiSelectPicker
            title="Vesityypit"
            options={WATER_OPTIONS}
            values={waterTypes}
            onChange={setWaterTypes}
          />

          {/* Tallenna */}
          <Pressable
            onPress={onSave}
            style={{
              backgroundColor: "#ffffffcc",
              padding: 12,
              borderRadius: 8,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Tallenna muutokset</Text>
          </Pressable>

          {/* POISTA */}
          <Pressable
            onPress={onDelete}
            style={{
              backgroundColor: "rgba(255,0,0,0.8)",
              padding: 12,
              borderRadius: 8,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>Poista uistin</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}