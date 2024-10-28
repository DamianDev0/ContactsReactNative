import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTextChange = (text: string) => {
    setSearchTerm(text);
    onSearch(text);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={handleTextChange}
        placeholderTextColor={'#000'}
      />
      {searchTerm ? (
        <TouchableOpacity onPress={handleClearSearch} style={styles.iconContainer}>
          <Icon name="times-circle" size={18} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onSearch(searchTerm)} style={styles.iconContainer}>
          <Icon name="search" size={18} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingRight: 40,
    color: '#000',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
  },
});

export default SearchBar;
