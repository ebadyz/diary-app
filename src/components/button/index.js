import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "100%" }}>
      <View style={styles.button}>
        <Text style={styles.label}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#1ed760",
  },
  label: {
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
