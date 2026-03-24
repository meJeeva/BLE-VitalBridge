import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

const VBCard = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default VBCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});