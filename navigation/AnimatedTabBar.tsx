import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig,
} from "@gorhom/animated-tabbar";
import TabOneScreen from "../screens/TabOneScreen";
import CustomCamera from "../screens/CustomCamera";
import BLEScreen from "../screens/BLEScreen";
import Login from "../screens/Login";
import { Feather } from "@expo/vector-icons";

const tabs: TabsConfig<BubbleTabBarItemConfig> = {
  Home: {
    labelStyle: {
      color: "#0f0f0f",
    },
    icon: {
      component: (props) => (
        <Feather {...props} name="activity" size={24} color="black" />
      ),

      activeColor: "rgba(91,55,183,1)",
      inactiveColor: "rgba(0,0,0,1)",
    },
    background: {
      activeColor: "rgba(223,215,243,1)",
      inactiveColor: "rgba(223,215,243,0)",
    },
  },
  Camera: {
    labelStyle: {
      color: "#1194AA",
    },
    icon: {
      component: (props) => (
        <Feather {...props} name="camera" size={24} color="black" />
      ),
      activeColor: "rgba(17,148,170,1)",
      inactiveColor: "rgba(0,0,0,1)",
    },
    background: {
      activeColor: "rgba(207,235,239,1)",
      inactiveColor: "rgba(207,235,239,0)",
    },
  },
  Login: {
    labelStyle: {
      color: "#1194AA",
    },
    icon: {
      component: (props) => (
        <Feather {...props} name="user" size={24} color="black" />
      ),
      activeColor: "rgba(17,148,170,1)",
      inactiveColor: "rgba(0,0,0,1)",
    },
    background: {
      activeColor: "rgba(207,235,239,1)",
      inactiveColor: "rgba(207,235,239,0)",
    },
  },
  BLE: {
    labelStyle: {
      color: "#1194AA",
    },
    icon: {
      component: (props) => (
        <Feather {...props} name="user" size={24} color="black" />
      ),
      activeColor: "rgba(17,148,170,1)",
      inactiveColor: "rgba(0,0,0,1)",
    },
    background: {
      activeColor: "rgba(207,235,239,1)",
      inactiveColor: "rgba(207,235,239,0)",
    },
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar preset="bubble" tabs={tabs} {...props} />
      )}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={TabOneScreen} />
      <Tab.Screen name="Camera" component={CustomCamera} />
      <Tab.Screen name="BLE" component={BLEScreen} />
    </Tab.Navigator>
  );
}
