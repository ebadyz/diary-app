import * as React from 'react';
import {
  Text,
  View,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

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
