import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme';

const VBModal = ({ visible, children, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default VBModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
});