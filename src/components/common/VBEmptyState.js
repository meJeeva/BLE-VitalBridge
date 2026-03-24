import React from 'react';
import { View, StyleSheet } from 'react-native';
import VBText from './VBText';

const VBEmptyState = ({ 
  icon, 
  title, 
  subtitle, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <VBText variant="heading" style={styles.icon}>{icon}</VBText>}
      <VBText variant="subtitle" style={styles.title}>{title}</VBText>
      <VBText variant="body" style={styles.subtitle}>{subtitle}</VBText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default VBEmptyState;
