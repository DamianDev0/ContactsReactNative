import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface TransportModePickerProps {
  transportMode: string;
  setTransportMode: (value: string) => void;
}

const TransportModePicker: React.FC<TransportModePickerProps> = ({ transportMode, setTransportMode }) => {
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={setTransportMode}
        items={[
          { label: 'Carro', value: 'driving' },
          { label: 'Motocicleta', value: 'motorcycle' },
          { label: 'Caminando', value: 'walking' },
        ]}
        style={pickerSelectStyles}
        value={transportMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
    padding: 4,
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
    paddingRight: 30,
  },
});

export default TransportModePicker;
