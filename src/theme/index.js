import { DefaultTheme, DarkTheme } from "react-native-paper";

export const Light = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1ed760",
      accent: "#f1c40f",
      background: "#ffffff",
      text: "#000000",
      placeholder: "#757575"
    },
  };

  export const Dark = {
    ...DarkTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1ed760",
      accent: "#f1c40f",
      background: "#ffffff",
      text: "#000000",
      placeholder: "#757575"
    },
  };