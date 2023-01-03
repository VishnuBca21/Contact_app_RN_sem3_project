import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./SignIn";
import Register from "./Register";
import Contact from "./Contact";
import CreateContact from "./CreateContact";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { UserContext } from "./UserContaxt";
import EditContact from "./EditContact";

export default function Screen() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <UserContext.Provider value={{ user: [] }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Contact"
              component={Contact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateContact"
              component={CreateContact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditContact"
              component={EditContact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
});
