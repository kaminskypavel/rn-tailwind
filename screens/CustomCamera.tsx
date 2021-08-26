import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import PlateSVG from "../components/PlateSVG";
import tw from "../lib/tailwind";
import functions from "@react-native-firebase/functions";

export default function CustomCamera() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera>();

  const snap = async () => {
    const camera = cameraRef.current;
    if (camera) {
      const photo = await camera.takePictureAsync();
      MediaLibrary.saveToLibraryAsync(photo.uri);
      console.log(photo);
    } else {
      console.error("No camera");
    }

    /*     const imgData = {
      image: {
        source: {
          imageUri:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        // content?: Uint8Array | string | null;
      },
      features: [
        {
          type: "LOGO_DETECTION",
          maxResults: 1,
        },
      ],
    };
    console.log("reqyesting data", imgData);
    const { data } = await functions().httpsCallable("annotateImage")(
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    );
    console.log(data);
 */
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={tw`w-full h-full flex items-center justify-center `}>
      <Camera
        style={tw`flex w-full h-full`}
        type={type}
        useCamera2Api={true}
        /* @ts-ignore */
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <Text style={tw`text-red-900`}> Flip </Text>
          <View style={tw`w-full`}>
            <PlateSVG />
          </View>
        </View>
        <Pressable
          style={tw`bg-green-500 rounded-xl ring-pink-300 mt-12 p-5`}
          onPress={snap}
        >
          <Text style={tw`w-full text-white text-center`}>Snap an Image</Text>
        </Pressable>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
