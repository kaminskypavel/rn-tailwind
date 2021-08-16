import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import tw from "./../lib/tailwind";

export default function TabOneScreen() {
  return (
    <View style={tw`pt-12 items-center h-full ios:bg-white androidd:bg-black`}>
      <Image style={tw`w-48 h-48 mb-10`} source={require("./plant.png")} />

      <View style={tw`rounded-t-lg w-20/21 h-full `}>
        <Svg height="200" preserveAspectRatio="" width="100%" >
          <Path
            fill="#67864A"
            fill-opacity="1"
            d="M0,0L80,37.3C160,75,320,149,480,160C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></Path>
        </Svg>

        <View style={tw`bg-mygreen  flex  flex-col h-full`}>
          <Text style={tw`font-bold text-2xl text-white mt-4 mx-4`}>
            Aloe Vera
          </Text>

          <Text style={tw`text-white mx-4 mb-4`}>Xerovit</Text>

          <Text style={tw`text-white mx-4`}>
            Very short - stemmed plant growing to 50-100 cm (25-40 in) tall,
            spreading by offsets. Have thick and fleshy leaves that hold water
            to sustain the palnt during a drought.
          </Text>

          <TouchableOpacity
            onPress={() => {}}
            style={tw`rounded-lg bg-green-400 ml-4 mt-4 w-2/3 `}
          >
            <Text
              style={tw`text-white font-bold text-xl text-center px-4 py-3`}
            >
              I'm a button
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
