import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../theme';

const VBActivityIndicator = ({ 
  size = 'small', 
  color = COLORS.primary,
  style,
  ...props 
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={size}
        color={color}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VBActivityIndicator;
