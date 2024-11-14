import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface RolePickerProps {
  role: string;
  setRole: (value: string) => void;
}

const RolePicker: React.FC<RolePickerProps> = ({ role, setRole }) => {
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={setRole}
        items={[
          { label: 'CUSTOMER', value: 'CUSTOMER' },
          { label: 'FRIEND', value: 'FRIEND' },
        ]}
        style={pickerSelectStyles}
        value={role}
        placeholder={{
          label: 'Role...',
          value: null,
          color: 'black',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'relative',
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    right: 80,
    zIndex: 1,
    padding: 2,
    width: 150,
    height: 45,
    alignItems: 'flex-start',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'black',
    paddingRight: 40,
    justifyContent: 'flex-end',
  },
  placeholder: {
    color: '#515a5a',  
  },
});

export default RolePicker;