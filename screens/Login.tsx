import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import tw from "../lib/tailwind";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

export default function Login() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [photo, setPhoto] = useState("");

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    const reference = await storage().ref("homer.jpg");
    const photo = await reference.getDownloadURL();
    setPhoto(photo);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const login = async () => {
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

    const snapshot = await database().ref("/users/pavel").once("value");
    console.log("User data: ", snapshot.val());
  };
  const logout = async () => {
    try {
      await auth().signOut();
      console.log("User signed out1");
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

  if (!user?.email) {
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
    <View style={tw`flex items-center justify-center`}>
      <Pressable onPress={logout}>
        <Text style={tw`bg-red-400 p-4 m-10 rounded-xl text-center`}>
          Logout
        </Text>
      </Pressable>

      <Image
        style={tw`rounded-full w-24 h-24`}
        source={{
          uri: photo,
        }}
      />

      <Text style={tw` p-4 m-10 border-2  text-center`}>
        {photo}
        {JSON.stringify(user)}
      </Text>
    </View>
  );
}
