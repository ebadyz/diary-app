import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import SQLite from "react-native-sqlite-storage";
import {
  Provider as PaperProvider,
  Button,
  IconButton,
} from "react-native-paper";
import theme from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./src/contexts/auth";
import DrawerContent from "./src/components/drawerContent";
import Splash from "./src/screens/splash";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import AddDiary from "./src/screens/add";
import EditDiary from "./src/screens/edit";
import Profile from "./src/screens/profile";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Sign In" }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "Diary",
        animationEnabled: false,
        headerLeft: () => (
          <IconButton
            icon="menu"
            size={24}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="Add"
      component={AddDiary}
      options={{
        title: "Add Diary",
        animationEnabled: false,
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />
     <HomeStack.Screen
      name="Edit"
      component={EditDiary}
      options={{
        title: "Edit",
        animationEnabled: false,
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const DrawerMenu = createDrawerNavigator();
const DrawerScreen = () => (
  <DrawerMenu.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <DrawerMenu.Screen name="Home" component={HomeStackScreen} />
    <DrawerMenu.Screen name="Profile" component={ProfileStackScreen} />
  </DrawerMenu.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    const temp = {
      user: null,
      signIn: (username, email, password) => {
        temp.user = { username: username };
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
    return temp;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
}
