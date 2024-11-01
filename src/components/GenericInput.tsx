import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  height?: number;
  width?: number;
  color?: string;
  marginBottom?: number;
}

const InputGeneric: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  height,
  width,
  color,
  marginBottom,
}) => {
  return (
    <TextInput
      style={[
        styles.input,
        { height, width, color, marginBottom },
      ]}
      placeholder={placeholder}
      placeholderTextColor="rgba(0, 0, 0, 0.5)"
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 9,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: 350,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    color: '#000',
    shadowRadius: 4,
    elevation: 5,
  },
});

export default InputGeneric;
