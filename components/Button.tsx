import React from "react";
import { Pressable, Text } from "react-native";
import tw from "../lib/tailwind";

type Props = {
  onPress: () => void;
  title: string;
  style?: string;
};

const Button: React.FC<Props> = ({ onPress: callback, title, style = "" }) => (
  <Pressable onPress={callback}>
    <Text style={tw`p-4 rounded-xl text-center ${style}`}>{title}</Text>
  </Pressable>
);

export default Button;
