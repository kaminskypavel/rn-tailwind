import { StackScreenProps } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import tw from "../../lib/tailwind";

import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import * as screens from "./../../constants/screen";
type Props = StackScreenProps<RootStackParamList, "SplashScreen">;
import * as Device from "expo-device";

const TIMEOUT = 1000;
//https://lottiefiles.com/40864-the-awkward-monster
const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [isHidden, setIsHidden] = useState(false);
  const hide = () => {
    if (!isHidden) {
      setIsHidden(true);
      navigation.replace(screens.MAIN);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      console.log("Splash::timeout", Device.osName);
      hide();
    }, TIMEOUT);
  });

  return (
    <View style={tw`flex  items-center justify-center w-full h-full`}>
      <LottieView
        autoPlay={true}
        speed={1}
        autoSize={false}
        source={require("./monster.json")}
        onAnimationFinish={() => {
          console.log("Splash::onAnimationFinish", Device.osName);
          hide();
        }}
      />
      <Text style={tw`text-4xl text-red-500 pt-48`}> Deabetus!</Text>
    </View>
  );
};

export default SplashScreen;
