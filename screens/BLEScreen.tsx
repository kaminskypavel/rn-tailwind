import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import Button from "../components/Button";

import tw from "../lib/tailwind";
import useBluetoothDevices, {
  useManager,
  useManagerState,
} from "./../hooks/useBluetoothDevices";

export default function BLEScreen() {
  const bleManager = useManager();
  const state = useManagerState(bleManager);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Text style={{ fontSize: 18, color: "white" }}>State: {state}</Text>
      {state === "PoweredOn" && <DeviceScanner bleManager={bleManager} />}
    </View>
  );
}

// !important : https://github.com/dotintent/react-native-ble-plx/issues/390
const DeviceScanner: React.FC<{ bleManager: BleManager }> = ({
  bleManager,
}) => {
  const [devices] = useBluetoothDevices(bleManager);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>();
  console.log({devices, connectedDevice});
  const handlePressButton = async (device: Device) => {
    try {
      Alert.alert(device.id);
      const res = await bleManager.connectToDevice(device.id);
      console.log("conected 📱📱📱📱");
      setConnectedDevice(device);

      const allServicesAndCharachteristics =
        await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();

      console.log(11111111111, { services });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View>
      {connectedDevice && (
        <View style={tw`text-white`}>
          <Text>connected device options</Text>
          <Button
            title="disconnect"
            onPress={async () => {
              connectedDevice?.cancelConnection();
              setConnectedDevice(null);
            }}
          />
        </View>
      )}

      {devices
        .filter(({ name }) => name)
        .map((device, index) => (
          <Pressable
            style={tw`border-b-2 border-red-600 m-4 bg-pink-400`}
            onPress={() => handlePressButton(device)}
            key={`-${index}`}
          >
            <Text style={tw`text-white`}>{device.name}</Text>
          </Pressable>
        ))}
    </View>
  );
};
