import React from "react";
import { Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";

import useBluetoothDevices, {
  useManager,
  useManagerState,
} from "./../hooks/useBluetoothDevices";

export default function BLEScreen() {
  const bleManager = useManager();
  const state = useManagerState(bleManager);

  // console.log("Info:", state);

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

const DeviceScanner: React.FC<{ bleManager: BleManager }> = ({
  bleManager,
}) => {
  const [devices] = useBluetoothDevices(bleManager);

  React.useEffect(() => {
    // console.log(devices);
  }, [devices]);

  return (
    <View>
      {devices
        .filter(({ name }) => name)
        .map((device, index) => (
          <Text key={`-${index}`} style={{ fontSize: 14, color: "white" }}>
            {device.name}
          </Text>
        ))}
    </View>
  );
};
