import * as React from "react";
import { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const DrawerMenu = createDrawerNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AddDiaryStack = createStackNavigator();

const LoginStackScreen = () => {
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>;
};
const HomeStackScreen = () => {
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>;
};
const AddDiaryStackScreen = () => {
  <AddDiaryStack.Navigator>
    <AddDiaryStack.Screen name="Add" component={AddDiary} />
  </AddDiaryStack.Navigator>;
};
const ProfileStackScreen = () => {
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  if (isLoading) {
    return <Splash />;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <DrawerMenu.Navigator>
          <DrawerMenu.Screen name="Home" component={HomeStackScreen} />
          <DrawerMenu.Screen name="Add" component={AddDiaryStackScreen} />
          <DrawerMenu.Screen name="Profile" component={ProfileStackScreen} />
        </DrawerMenu.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
