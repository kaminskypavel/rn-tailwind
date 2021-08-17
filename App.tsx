import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import tw from "./lib/tailwind";
import SplashScreen from "./screens/Splash";

export default function App() {
  const { isLoadingComplete, onLayoutRootView } = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View style={tw`w-full h-full`} onLayout={onLayoutRootView}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </View>
      </SafeAreaProvider>
    );
  }
}
