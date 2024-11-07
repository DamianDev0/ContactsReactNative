// ActionButtons.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from './ButtonsAction';

interface ActionButtonsProps {
  email: string;
  phone: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ email, phone }) => {
  return (
    <View style={styles.actionButtonsContainer}>
      <ActionButton iconName="envelope" text={email} />
      <ActionButton iconName="phone" text={phone} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    paddingHorizontal: 10,
  },
});

export default ActionButtons;
