import { Pressable, Text, View } from "react-native";

// Yhteinen toggle-funktio (sama kuin ColorPickerissä)
function toggleValue(list, value, onChange) {
  if (list.includes(value)) {
    onChange(list.filter((v) => v !== value));
  } else {
    onChange([...list, value]);
  }
}

export default function MultiSelectPicker({ title, options, values, onChange }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>{title}</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map((item) => {
          const selected = values.includes(item);

          return (
            <Pressable
              key={item}
              onPress={() => toggleValue(values, item, onChange)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                margin: 4,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: selected ? "#1040dd" : "#ccc",
                backgroundColor: selected ? "#1040dd22" : "#ffffffaa",
              }}
            >
              <Text>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}