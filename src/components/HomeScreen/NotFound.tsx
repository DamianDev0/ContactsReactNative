
import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import GenericButton from '../GenericButton';

interface NotFoundProps {
  onAddContact: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onAddContact }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/Contemplative.png')} style={styles.logo} />
      <Text style={styles.textNotFound}>No contacts found?</Text>
      <Text style={styles.textSubNotFound}>
        You don't have any contacts yet. Start by adding a new contact to get started!
      </Text>
      <GenericButton title="Add new contacts" color="#000" onPress={onAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
    width: 320,
    height: 300,
  },
  textNotFound: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
  textSubNotFound: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
    fontWeight: '400',
  },
});

export default NotFound;
