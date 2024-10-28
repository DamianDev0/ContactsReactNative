import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface GenericButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  color?: string;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  onPress,
  disabled,
  width,
  height,
  color = '#007BFF',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: width || 200,
          height: height || 50,
          backgroundColor: color,
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.40,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GenericButton;
