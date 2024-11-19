import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {View, TextInput, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SearchFilterProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchType: 'name' | 'email' | 'phone';
  setSearchType: (type: 'name' | 'email' | 'phone') => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchText,
  setSearchText,
  searchType,
  setSearchType,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <FontAwesome
          name="search"
          size={20}
          color="#515a5a"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={`Search by ${searchType}`}
          value={searchText}
          onChangeText={setSearchText}
        />
        <RNPickerSelect
          value={searchType}
          onValueChange={setSearchType}
          style={pickerSelectStyles}
          items={[
            {label: 'Name', value: 'name'},
            {label: 'Email', value: 'email'},
            {label: 'Phone', value: 'phone'},
          ]}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: 'select filter', value: null}}
        />
        <FontAwesome
          name="filter"
          size={20}
          color="#515a5a"
          style={styles.pickerIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 410,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 60,
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    left: 17,
    top: '50%',
    marginTop: -10,
  },
  pickerIcon: {
    position: 'absolute',
    right: 80,
    top: '50%',
    marginTop: -10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'transparent',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'transparent',
    paddingRight: 40,
  },
  placeholder: {
    color: 'transparent',
  },
});

export default SearchFilter;
