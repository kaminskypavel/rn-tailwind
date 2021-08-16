import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "./../lib/tailwind";

export default function TabTwoScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState<boolean>(false);

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
    <View style={tw`w-full h-full flex items-center justify-center`}>
      <Pressable onPress={() => setShowCamera(true)}>
        <Text style={tw`bg-mygreen p-4 rounded-xl text-white font-bold`}>
          Open Camera
        </Text>
      </Pressable>

      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "40%",
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
