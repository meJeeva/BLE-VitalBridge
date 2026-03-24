import React from 'react';
import { View, TextInput as RNInput, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme';

const VBTextInput = ({ style, ...props }) => {
  return (
    <View style={styles.container}>
      <RNInput
        placeholderTextColor={COLORS.grey}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
};

export default VBTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    ...TYPOGRAPHY.body,
    height: 45,
    color: COLORS.black,
  },
});