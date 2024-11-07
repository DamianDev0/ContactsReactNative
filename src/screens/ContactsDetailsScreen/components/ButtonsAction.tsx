import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ActionButtonProps {
  iconName: string;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({iconName, text}) => {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <Icon name={iconName} size={18} color="black" />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 155,
    height: 56,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'ultralight',
    letterSpacing: 1,
    width: '100%',
    overflow: 'hidden',
  },
});

export default ActionButton;
