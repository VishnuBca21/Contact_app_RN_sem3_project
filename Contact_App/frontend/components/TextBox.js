import { View, Text, TextInput, StyleSheet } from "react-native";

export default function TextBox({
  placeholder,
  text,
  secure,
  customStyle,
  onChange,
  value
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        placeholder={placeholder}
        style={[styles.inputbox, { customStyle }]}
        secureTextEntry={secure}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputbox: {
    borderColor: "#e6e6e6",
    color: "#64676a",
    borderWidth: "1px",
    padding: "10px",
    width: "100%",
  },
  text: {
    marginTop: ".5rem",
    marginBottom: ".5rem",
  },
});
