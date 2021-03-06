import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import * as screen from "./../constants/screen";
import tw from "./../lib/tailwind";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function TabOneScreen({ navigation }: any) {
  const handleNavigatePress = () => {
    // const navigation = useNavigation();
    navigation.navigate(screen.NOTFOUND);
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismissBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  // const user = auth().currentUser;
const user = {email:"email"};
  return (
    <BottomSheetModalProvider>
      <View style={tw`pt-12 items-center h-full`}>
        <Image style={tw`w-48 h-48 mb-10`} source={require("./plant.png")} />
        <Text>Welcome {user.email}</Text>
        <View style={tw`rounded-t-lg w-full h-full `}>
          <Svg height="200" preserveAspectRatio="" width="100%">
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

            <View style={tw`flex flex-row`}>
              <Pressable
                onPress={handlePresentModalPress}
                style={tw`rounded-xl bg-green-400 ml-4 mt-4 w-1/3`}
              >
                <Text style={tw`text-white font-bold  text-center p-2`}>
                  Open Sheets
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleNavigatePress()}
                style={tw`rounded-xl bg-yellow-400 ml-4 mt-4 w-1/3`}
              >
                <Text style={tw`text-white font-bold text-center p-2`}>
                  Navigate Away
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={tw`flex flex-row justify-center items-center`}>
            <Text>Awesome ????</Text>

            <Pressable
              onPress={dismissBottomSheet}
              style={tw`flex flex-col justify-center items-center ml-4`}
            >
              <Svg
                style={tw`h-6 w-6 text-black`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <Path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Svg>
            </Pressable>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
