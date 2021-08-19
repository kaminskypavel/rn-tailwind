import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import tw from "./lib/tailwind";
import Navigation from "./navigation";
import useBackAction from "./hooks/useBackAction";
import { BackHandler } from "react-native";

export default function App() {
  const { isLoadingComplete, onLayoutRootView } = useCachedResources();
  const colorScheme = useColorScheme();
  useBackAction(() => BackHandler.exitApp());

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={tw`w-full h-full`} onLayout={onLayoutRootView}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaView>
    );
  }
}
