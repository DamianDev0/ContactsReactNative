import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  height?: number;
  width?: number;
  color?: string;
  marginBottom?: number;
  opacity?: number;
  icon?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
}

const InputGeneric: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  height = 50,
  width = 350,
  color,
  marginBottom,
  opacity = 1,
  icon,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.inputContainer, {height, width, marginBottom}]}>
      {icon && (
        <FontAwesome name={icon} size={20} color="#000" style={styles.icon} />
      )}
      <TextInput
        style={[styles.input, {height, width, color, opacity}]}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 9,
    borderRadius: 10,
    backgroundColor: '#FFF',
    color: '#000',
  },
});

export default InputGeneric;
