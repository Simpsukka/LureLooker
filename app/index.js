import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import LureCard from "../components/LureCard";
import { useLureContext } from "../src/context/LureContext";
import { globalStyles } from "../src/styles";

export default function Index() {
  const { lures } = useLureContext();
  const [search, setSearch] = useState("");

  // Suodatus
  const filteredLures = lures.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  function clearSearch() {
    setSearch("");
  }

  return (
    <ImageBackground
      source={require("../assets/images/sea.jpg")}
      style={globalStyles.backgroundImage}
    >
      <View style={globalStyles.backgroundOverlay} pointerEvents="none" />

      <ScrollView contentContainerStyle={globalStyles.listContainer}>

        {/* Lisää uistin */}
        <Pressable
          onPress={() => router.push("/add-lure")}
          style={{
            backgroundColor: "#ffffffcc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Lisää uistin</Text>
        </Pressable>

        {/* Hae paras uistin */}
        <Pressable
          onPress={() => router.push("/conditions")}
          style={{
            backgroundColor: "#ffffffcc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Hae paras uistin</Text>
        </Pressable>

        {/* Hakukenttä */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />

          <TextInput
            placeholder="Hae uistinta nimellä..."
            placeholderTextColor="#777"
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              fontSize: 16,
              color: "#000",
            }}
          />

          {search.length > 0 && (
            <Pressable onPress={clearSearch}>
              <Ionicons name="close-circle" size={22} color="#777" />
            </Pressable>
          )}
        </View>

        {/* Uistinlista */}
        {filteredLures.length === 0 ? (
          <Text style={{ color: "#fff", fontSize: 16, marginTop: 20 }}>
            Ei tuloksia.
          </Text>
        ) : (
          filteredLures.map((lure) => (
            <LureCard
              key={lure.id}
              lure={lure}
              onPress={() =>
                router.push({ pathname: "/edit-lure", params: { id: lure.id } })
              }
            />
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
}