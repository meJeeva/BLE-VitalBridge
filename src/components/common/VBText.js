import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TYPOGRAPHY, COLORS } from '../../theme';

const VBText = ({ 
  children, 
  variant = 'body', 
  style, 
  numberOfLines,
  ellipsizeMode,
  ...props 
}) => {
  return (
    <Text
      style={[styles[variant], style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: TYPOGRAPHY.heading,
  title: TYPOGRAPHY.title,
  subtitle: TYPOGRAPHY.subtitle,
  body: TYPOGRAPHY.body,
  bodyMedium: TYPOGRAPHY.bodyMedium,
  caption: TYPOGRAPHY.caption,
  small: TYPOGRAPHY.small,
  button: TYPOGRAPHY.button,
  deviceName: TYPOGRAPHY.deviceName,
  deviceId: TYPOGRAPHY.deviceId,
  statusText: TYPOGRAPHY.statusText,
  bluetoothState: TYPOGRAPHY.bluetoothState,
});

export default VBText;
