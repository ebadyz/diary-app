import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Headline style={styles.logoTitle}>Dear Diary</Headline>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ed760",
  },
  logoTitle: {
    color: "#ffffff",
  },
});

export default Splash;
