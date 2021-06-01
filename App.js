import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import SQLite from "react-native-sqlite-storage";
import {
  Provider as PaperProvider,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
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
import Detail from "./src/screens/detail";
import { DBContext } from "./src/contexts/db";
import { CustomDarkTheme, CustomDefaultTheme } from "./src/themes";
import { Client } from "./src/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      name="Detail"
      component={Detail}
      options={{
        title: "Diary Detail",
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

const apiClient = new Client("/");

export default function App() {
  const [authState, setAuthState] = useState({ state: "pending" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [db, setDb] = useState(null);

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = useMemo(() => {
    const temp = {
      signIn: (email, password) => {
        setAuthState({ state: "pending" });
        apiClient.signIn(email, password).then(() => {
          setAuthState({ state: "signedIn", token: "a".repeat(32), email });
        });
      },
      signOut: () => {
        setAuthState({ state: "pending" });
        apiClient.signout().then(() => {
          AsyncStorage.clear().then(() => {
            setAuthState({ state: "signedOut" });
          });
        });
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
      getUser() {
        return {
          email: authState.email,
        };
      },
    };
    return temp;
  }, [authState]);

  // Persist token after login
  useEffect(async () => {
    if (authState?.token) {
      // TODO: Handle expiration of token and automatic signouts
      // TODO: use secure keychain or OS vault to securely save the password
      await AsyncStorage.setItem(
        "auth",
        JSON.stringify({
          token: authState.token,
          email: authState.email,
        })
      );
    }
  }, [authState]);

  // Check initial auth token
  useEffect(() => {
    AsyncStorage.getItem("auth").then((auth) => {
      if (auth) {
        setAuthState({
          status: "signedin",
          ...JSON.parse(auth),
        });
      } else {
        setAuthState({
          status: "idle",
        });
      }
    });
  }, []);

  // Open DB
  useEffect(() => {
    // TODO: Handle error loading database
    setDb(
      SQLite.openDatabase(
        {
          name: "MainDB",
          location: "default",
        },
        () => {},
        (error) => {
          console.log(error);
        }
      )
    );
  }, []);

  if (authState?.state === "pending") {
    return <Splash />;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        {db ? (
          <DBContext.Provider value={db}>
            <NavigationContainer theme={theme}>
              <RootStackScreen userToken={authState?.token} />
            </NavigationContainer>
          </DBContext.Provider>
        ) : (
          <ActivityIndicator color="#1ed760" size="large" animating={true} />
        )}
      </AuthContext.Provider>
    </PaperProvider>
  );
}
