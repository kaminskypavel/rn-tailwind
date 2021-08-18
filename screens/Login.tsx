import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "../lib/tailwind";

export default function Login() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const login = () => {
    auth()
      .signInWithEmailAndPassword("test@diabeetus.com", "123456")
      .then(() => {
        console.log("User signed in");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  };
  const logout = async () => {
    try {
      await auth().signOut();
      console.log("User signed out");
    } catch (error) {
      if (error.code === "auth/operation-not-allowed") {
        console.log("Enable anonymous in your firebase console.");
      }

      console.error(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Pressable onPress={login}>
          <Text style={tw`bg-green-400 p-4 m-10 rounded-xl text-center`}>
            Login
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Pressable onPress={logout}>
        <Text style={tw`bg-red-400 p-4 m-10 rounded-xl text-center`}>
          Logout
        </Text>
      </Pressable>

      <Text style={tw` p-4 m-10 border-2 text-xl text-center`}>
        {JSON.stringify(user)}
      </Text>
    </View>
  );
}
