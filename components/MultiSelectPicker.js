import { Pressable, Text, View } from "react-native";

export default function MultiSelectPicker({ title, options, values, onChange }) {
  function toggle(item) {
    if (values.includes(item)) {
      onChange(values.filter((v) => v !== item));
    } else {
      onChange([...values, item]);
    }
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>{title}</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map((item) => {
          const selected = values.includes(item);

          return (
            <Pressable
              key={item}
              onPress={() => toggle(item)}
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