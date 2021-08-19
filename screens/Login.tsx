import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import tw from "../lib/tailwind";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import Button from "../components/Button";
import notifee, { AndroidLaunchActivityFlag } from "@notifee/react-native";

export default function Login() {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [photo, setPhoto] = useState("");

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    const reference = await storage().ref("homer.jpg");
    const photo = await reference.getDownloadURL();
    setPhoto(photo);
    setUser(user);
  }
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    try {
      // Display a notification
      await notifee.displayNotification({
        title: "Notification Title",
        body: "Main body content of the notification",
        android: {
          channelId,
          smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  const remote = async () => {
    // Create a channel
    const remoteChannelId = await notifee.createChannel({
      id: "remote",
      name: "remote notifications Channel",
    });

    try {
      notifee.displayNotification({
        title: "Small Icon",
        body: "A notification using the small icon!.",
        android: {
          color: "#9c27b0",
          channelId: remoteChannelId,
          largeIcon: require("./../assets/images/homer.png"),
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
          },
          actions: [
            {
              title: "<b>Dance</b> &#128111;",
              pressAction: { id: "dance" },
            },
            {
              title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
              pressAction: { id: "cry" },
            },
          ],
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
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
        {JSON.stringify(user.email)}
      </Text>

      <Button
        title="Remote Push Notification"
        onPress={remote}
        style="bg-blue-400 m-4 text-white"
      />

      <Button
        title="Local Push Notification"
        onPress={onDisplayNotification}
        style="bg-yellow-400 text-black"
      />
    </View>
  );
}
