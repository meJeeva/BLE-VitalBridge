import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { State } from "react-native-ble-plx";
import { getBleManager, destroyBleManager } from "../../services/ble/bleManager";
import requestBLEPermissions from "./../../services/ble/requestBLEPermissions";
import { VBButton, VBIcon } from "../../components/common";
import { COLORS } from "../../theme";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

const SCAN_CYCLE_MS = 8000;
const SCAN_RESTART_DELAY_MS = 1500;

const BLE_ERROR_CODES = {
  OPERATION_CANCELLED: 2,
  BLUETOOTH_UNAUTHORIZED: 101,
  BLUETOOTH_POWERED_OFF: 102,
  SCAN_STARTED_FAILED: 600,
};

const BLEScreen = () => {
  const [devices, setDevices] = useState([]);
  const [connectedId, setConnectedId] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [btState, setBtState] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Initializing...");

  const scanCycleTimerRef = useRef(null);
  const restartTimerRef = useRef(null);
  const stateSubscriptionRef = useRef(null);
  const connectedDeviceRef = useRef(null);
  const isContinuousRef = useRef(true);
  const btStateRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      init();
    }, 300);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  const handleOpenBluetoothModal = () => {
  };

  const cleanup = () => {
    isContinuousRef.current = false;
    clearTimeout(scanCycleTimerRef.current);
    clearTimeout(restartTimerRef.current);
    stateSubscriptionRef.current?.remove();
    try { getBleManager().stopDeviceScan(); } catch (e) {
      console.log('catch in cleanup : ', e)
    }
    destroyBleManager();
  };


  const init = async () => {
    setStatusMessage("Requesting permissions...");

    const granted = await requestBLEPermissions();

    if (!granted) {
      setStatusMessage("Permissions denied.");
      Alert.alert(
        "Permission Required",
        "Bluetooth permissions are required. Please enable them in Settings.",
        [{ text: "OK" }]
      );
      return;
    }
    const manager = getBleManager();
    manager.onStateChange(state => {
      setBtState(state);
      btStateRef.current = state;
    }, true);

    const enabled = await requestEnableBluetooth();
    listenToBluetoothState();
  };


 const requestEnableBluetooth = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await BluetoothStateManager.requestToEnable();

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    Linking.openURL('app-settings:'); 
    return false;
  }
};

  const listenToBluetoothState = () => {
    const manager = getBleManager();
    stateSubscriptionRef.current?.remove();

    stateSubscriptionRef.current = manager.onStateChange(state => {
      setBtState(state);
      btStateRef.current = state;

      switch (state) {
        case State.PoweredOn:
          setStatusMessage("Bluetooth ready. Starting scan...");
          isContinuousRef.current = true;
          startScanCycle();
          break;

        case State.PoweredOff:
          setStatusMessage("Bluetooth is off.");
          stopAllScanning();
          handleOpenBluetoothModal();
          break;

        case State.Unauthorized:
          setStatusMessage("Bluetooth unauthorized.");
          stopAllScanning();
          Alert.alert(
            "Unauthorized",
            "Bluetooth permission was denied. Please allow it in Settings.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Turn on bluetooth",
                onPress: async () => {
                  const enabled = await requestEnableBluetooth();
                  if (!enabled) {
                    Linking.openSettings();
                  }
                },
              },
            ]
          );
          break;

        case State.Unsupported:
          setStatusMessage("Bluetooth not supported on this device.");
          Alert.alert("Unsupported", "This device does not support Bluetooth.");
          break;

        case State.Resetting:
          setStatusMessage("Bluetooth is resetting...");
          stopAllScanning();
          break;

        default:
          setStatusMessage(`Bluetooth state: ${state}`);
          break;
      }
    }, true);
  };

  const startScanCycle = () => {
    const manager = getBleManager();

    if (btStateRef.current !== State.PoweredOn) return;
    if (!isContinuousRef.current) return;

    clearTimeout(scanCycleTimerRef.current);
    clearTimeout(restartTimerRef.current);

    setScanning(true);
    setStatusMessage("Scanning for devices...");

    manager.startDeviceScan(
      null,
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          setScanning(false);

          switch (error.errorCode) {
            case BLE_ERROR_CODES.OPERATION_CANCELLED:
              break;

            case BLE_ERROR_CODES.BLUETOOTH_POWERED_OFF:
            case BLE_ERROR_CODES.SCAN_STARTED_FAILED:
              setStatusMessage("Scan failed. Bluetooth may be off.");
              isContinuousRef.current = false;
              break;

            case BLE_ERROR_CODES.BLUETOOTH_UNAUTHORIZED:
              setStatusMessage("Bluetooth permission denied.");
              isContinuousRef.current = false;
              Alert.alert(
                "Permission Denied",
                "Bluetooth permission was revoked. Please re-enable in Settings."
              );
              break;

            default:
              setStatusMessage("Scan error. Retrying...");
              if (isContinuousRef.current) {
                restartTimerRef.current = setTimeout(startScanCycle, SCAN_RESTART_DELAY_MS);
              }
              break;
          }
          return;
        }

        if (device?.name) {
          setDevices(prev => {
            if (prev.find(d => d.id === device.id)) return prev;
            return [...prev, device];
          });
        }
      }
    );

    scanCycleTimerRef.current = setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
      setStatusMessage("Refreshing scan...");

      if (isContinuousRef.current && btStateRef.current === State.PoweredOn) {
        restartTimerRef.current = setTimeout(startScanCycle, SCAN_RESTART_DELAY_MS);
      }
    }, SCAN_CYCLE_MS);
  };

  const stopAllScanning = () => {
    isContinuousRef.current = false;
    clearTimeout(scanCycleTimerRef.current);
    clearTimeout(restartTimerRef.current);
    try { getBleManager().stopDeviceScan(); } catch (e) {
    }
    setScanning(false);
    setStatusMessage("Scan stopped.");
  };

  const handleToggleScan = async () => {
    if (scanning) {
      stopAllScanning();
      return;
    }

    if (btStateRef.current !== State.PoweredOn) {
      const enabled = await requestEnableBluetooth();

      if (!enabled) return;
      return;
    }

    isContinuousRef.current = true;
    setDevices([]);
    startScanCycle();
  };


  const connectDevice = async device => {
    const manager = getBleManager();
    try {
      stopAllScanning();
      setStatusMessage(`Connecting to ${device.name}...`);

      const connected = await manager.connectToDevice(device.id, {
        timeout: 10000,
        autoConnect: false,
      });

      await connected.discoverAllServicesAndCharacteristics();

      connectedDeviceRef.current = connected;
      setConnectedId(device.id);
      setStatusMessage(`Connected to ${device.name}`);

      connected.onDisconnected((err, disconnectedDevice) => {
        setConnectedId(null);
        connectedDeviceRef.current = null;
        setStatusMessage("Device disconnected. Resuming scan...");
        isContinuousRef.current = true;
        startScanCycle();
      });
    } catch (error) {
      console.log("Error connecting to device:", error);
      setStatusMessage("Connection failed.");
      Alert.alert(
        "Connection Failed",
        error.reason ?? error.message ?? "Could not connect to the device."
      );
      isContinuousRef.current = true;
      startScanCycle();
    }
  };

  const disconnectDevice = async () => {
    try {
      if (connectedDeviceRef.current) {
        await getBleManager().cancelDeviceConnection(connectedId);
        connectedDeviceRef.current = null;
        setConnectedId(null);
        setStatusMessage("Disconnected.");
      }
    } catch (error) {
    }
  };

  const handleOpenSettings = () => {
    try {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    } catch (error) {
    }
  };


  const renderItem = ({ item }) => {
    const isConnected = item.id === connectedId;
    return (
      <TouchableOpacity
        style={[styles.device, isConnected && styles.deviceConnected]}
        onPress={() => (isConnected ? disconnectDevice() : connectDevice(item))}
        activeOpacity={0.75}>
        <View style={styles.deviceRow}>
          <View style={styles.deviceInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.id}>{item.id}</Text>
            {item.rssi != null && (
              <Text style={styles.rssi}>Signal: {item.rssi} dBm</Text>
            )}
          </View>
          <View style={[styles.badge, { backgroundColor: isConnected ? "#22c55e" : "#e5e7eb" }]}>
            <Text style={[styles.badgeText, { color: isConnected ? "#fff" : "#6b7280" }]}>
              {isConnected ? "Connected" : "Connect"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const btStateColor = () => {
    switch (btState) {
      case State.PoweredOn: return "#22c55e";
      case State.PoweredOff: return "#ef4444";
      case State.Unauthorized: return "#f97316";
      default: return "#9ca3af";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BLE Devices</Text>
        <View style={styles.btIndicator}>
          <View style={[styles.dot, { backgroundColor: btStateColor() }]} />
          <Text style={styles.btStateText}>{btState ?? "Unknown"}</Text>
        </View>
      </View>

      <View style={styles.statusBar}>
        {scanning && (
          <ActivityIndicator size="small" color="#3b82f6" style={{ marginRight: 8 }} />
        )}
        <Text style={styles.statusText}>{statusMessage}</Text>
        {devices.length > 0 && (
          <Text style={styles.deviceCount}>{devices.length} found</Text>
        )}
      </View>

      {btState === State.PoweredOff ? (
        <View style={styles.emptyState}>
          <VBIcon
            type="MaterialIcons"
            name="bluetooth"
            size={48}
            color="#9ca3af"
          />
          <Text style={styles.emptyTitle}>Bluetooth is off</Text>
          <Text style={styles.emptySubtitle}>
            Turn on the Bluetooth to scan for devices.
          </Text>
          <VBButton
            title="Open Settings"
            onPress={handleOpenSettings}
            style={[styles.button, styles.settingsButton]}
          />
        </View>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={devices.length === 0 && styles.emptyContainer}
          ListEmptyComponent={
            !scanning ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📡</Text>
                <Text style={styles.emptyTitle}>No devices found</Text>
                <Text style={styles.emptySubtitle}>
                  Make sure your device is nearby and advertising.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      {btState !== State.PoweredOff && (
      <TouchableOpacity
        style={[styles.scanBtn, scanning && styles.scanBtnActive]}
        onPress={handleToggleScan}
        activeOpacity={0.8}>
        <Text style={styles.scanBtnText}>
          {scanning ? "⏹  Stop Scanning" : "▶  Start Scanning"}
        </Text>
      </TouchableOpacity>
      )}
    </View>
  );
};

export default BLEScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: Platform.OS === "android" ? 8 : 0,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  btIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  btStateText: { fontSize: 12, color: "#475569", fontWeight: "500" },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statusText: { fontSize: 13, color: "#64748b", flex: 1 },
  deviceCount: { fontSize: 12, color: "#3b82f6", fontWeight: "600" },
  device: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  deviceConnected: { borderColor: "#22c55e", borderWidth: 1.5 },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deviceInfo: { flex: 1, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "600", color: "#0f172a", marginBottom: 3 },
  id: {
    fontSize: 11,
    color: "#94a3b8",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  rssi: { fontSize: 11, color: "#94a3b8", marginTop: 3 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: "center" },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontWeight: "600", color: "#334155", marginBottom: 6 },
  emptySubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  scanBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
  },
  scanBtnActive: { backgroundColor: "#ef4444" },
  scanBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  buttonContainer: {
    width: '100%',
    gap: 12,
    height: 100
  },
  button: {
    marginTop: 20
  },
  cancelButton: {
    backgroundColor: COLORS.lightGrey,
  },
  settingsButton: {
    backgroundColor: COLORS.primary,
  },
});