import { BleManager } from "react-native-ble-plx";

let managerInstance = null;

export const getBleManager = () => {
  if (!managerInstance) {
    managerInstance = new BleManager();
  }
  return managerInstance;
};

export const destroyBleManager = () => {
  if (managerInstance) {
    managerInstance.destroy();
    managerInstance = null;
  }
};