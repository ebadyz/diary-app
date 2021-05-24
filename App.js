import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from './src/theme'

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <View>
        <Text>Hello World!</Text>
      </View>
    </PaperProvider>
  );
};

export default App;