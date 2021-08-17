import { StackScreenProps } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import tw from "../../lib/tailwind";

import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import { hide } from "expo-splash-screen";

type Props = StackScreenProps<RootStackParamList, "SplashScreen">;

//https://lottiefiles.com/40864-the-awkward-monster
const SplashScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isHidden, setIsHidden] = useState(false);
  const hide = () => {
    if (!isHidden) {
      setIsHidden(true);
      navigation.navigate("Root");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      console.log("Splash::timeout");
      hide();
    }, 5000);
  });

  return (
    <View style={tw`flex  items-center justify-center w-full h-full`}>
      <LottieView
        autoPlay={true}
        speed={1}
        autoSize={false}
        source={require("./monster.json")}
        onAnimationFinish={() => {
          console.log("Splash::onAnimationFinish");
          hide();
        }}
      />
      <Text style={tw`text-4xl text-red-500 pt-48`}> Deabetus!</Text>
    </View>
  );
};

export default SplashScreen;
