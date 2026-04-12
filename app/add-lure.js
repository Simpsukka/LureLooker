import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
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

const FISH_OPTIONS = ["hauki", "ahven", "kuha", "lohi", "taimen"];
const WATER_OPTIONS = ["järvi", "joki", "meri","lampi"];
const TYPE_OPTIONS = ["jigi", "lippa", "vaappu", "lusikka"];

export default function AddLure() {
  const { addLure } = useLureContext();

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [colors, setColors] = useState([]);
  const [type, setType] = useState([]); // lista
  const [targetFish, setTargetFish] = useState([]);
  const [waterTypes, setWaterTypes] = useState([]);

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
    if (!name.trim()) {
      alert("Anna uistimelle nimi.");
      return;
    }

    if (type.length === 0) {
      alert("Valitse vähintään yksi uistimen tyyppi.");
      return;
    }

    if (colors.length === 0) {
      alert("Valitse vähintään yksi väri.");
      return;
    }

    const newLure = {
      id: Date.now().toString(),
      name,
      imageUri,
      type,          // lista
      color: colors,
      targetFish,
      waterTypes,
    };

    await addLure(newLure);
    router.push("/");
  }

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
              source={{ uri: imageUri }}
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

          {/* Lisää kuva */}
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
            <Text style={{ fontSize: 16 }}>Lisää kuva</Text>
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

          {/* Uistimen tyyppi MultiSelectPickerillä */}
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
            <Text style={{ fontSize: 16 }}>Tallenna</Text>
          </Pressable>

        </View>

      </ScrollView>
    </ImageBackground>
  );
}