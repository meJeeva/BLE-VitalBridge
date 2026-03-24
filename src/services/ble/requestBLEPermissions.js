import { PermissionsAndroid, Platform } from "react-native";

const requestBLEPermissions = () => {
  return new Promise(resolve => {
    setTimeout(async () => {
      if (Platform.OS !== "android") {
        resolve(true);
        return;
      }

      const apiLevel = Platform.Version;

      try {
        if (apiLevel >= 31) {
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ]);

          const allGranted = Object.values(result).every(
            status => status === PermissionsAndroid.RESULTS.GRANTED
          );

          if (!allGranted) {
            console.warn("[BLE] Permissions denied (Android 12+):", result);
          }

          resolve(allGranted);

        } 
        
        else if (apiLevel >= 23) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission Required",
              message:
                "Bluetooth scanning requires Location access on Android 11 and below.",
              buttonPositive: "Allow",
              buttonNegative: "Deny",
              buttonNeutral: "Ask Me Later",
            }
          );

          const granted = result === PermissionsAndroid.RESULTS.GRANTED;
          if (!granted) console.warn("[BLE] Location permission denied (Android 6-11)");
          resolve(granted);

        } 
        else {
          resolve(true);
        }
      } catch (error) {
        console.error("[BLE] Error requesting permissions:", error);
        resolve(false);
      }
    }, 100);
  });
};

export default requestBLEPermissions;