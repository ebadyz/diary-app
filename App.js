import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from './src/contexts/auth'

const DrawerMenu = createDrawerNavigator();
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AddDiaryStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => {
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
      name="Home"
      component={HomeStackScreen}
      />
    ) : (
      <RootStack.Screen name="Login" component={LoginStackScreen}/>
    )}
  </RootStack.Navigator>
}
const LoginStackScreen = () => {
  <AuthStack.Navigator>
    <AuthStack.Screen name="Home" component={Login} />
  </AuthStack.Navigator>;
};

const HomeStackScreen = () => {
  <DrawerMenu.Navigator>
    <DrawerMenu.Screen name="Home" component={Home} />
    <DrawerMenu.Screen name="Add" component={AddDiaryStackScreen} />
    <DrawerMenu.Screen name="Profile" component={ProfileStackScreen} />
  </DrawerMenu.Navigator>;
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
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn = () => {
        setIsLoading(false)
        setUserToken('asdf')
      },
      signOut = () => {
        setIsLoading(false)
        setUserToken(null)
      }
    }
  }, [])

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
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
