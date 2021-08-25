import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PlateSVG from "../components/PlateSVG";
import * as MediaLibrary from 'expo-media-library';

import tw from "../lib/tailwind";

export default function CustomCamera() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const navigation = useNavigation();
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
      {/* @ts-ignore */}
      <Camera
        style={tw`flex w-full h-full`}
        type={type}
        useCamera2Api={true}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.text}> Flip </Text>
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
  text: {
    fontSize: 18,
    color: "white",
  },
});
