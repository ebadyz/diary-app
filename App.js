import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import SQLite from "react-native-sqlite-storage";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Button,
  IconButton,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
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
import { ActivityIndicator } from "react-native";

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [db, setDb] = useState(null);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      primary: "#1ed760",
      accent: "#ffffff",
      background: "#ffffff",
      surface: "#f9f9f9",
      text: "#000000",
      placeholder: "#757575",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: "#1ed760",
      accent: "#111111",
      background: "#000000",
      surface: "#161616",
      text: "#ffffff",
      placeholder: "#757575",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    };
    return temp;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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

  if (isLoading) {
    return <Splash />;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        {db ? (
          <DBContext.Provider value={db}>
            <NavigationContainer theme={theme}>
              <RootStackScreen userToken={userToken} />
            </NavigationContainer>
          </DBContext.Provider>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </AuthContext.Provider>
    </PaperProvider>
  );
}
