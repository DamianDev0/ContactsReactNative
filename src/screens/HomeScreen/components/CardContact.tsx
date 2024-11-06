import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los íconos de FontAwesome
import {Contact2} from '../../../interfaces/Contact.interface';

interface CardContactProps {
  item: Contact2;
  onPress: (contact: Contact2) => void;
}

const CardContact: React.FC<CardContactProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.contactItem}>
      <View style={styles.contactDetails}>
        <Icon name="user" size={20} color="#f0b27a" style={styles.icon} />
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
      <View style={styles.contactDetails}>
        <Icon name="phone" size={20} color="#000" style={styles.icon} />
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 24,
    marginVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contactPhone: {
    fontSize: 16,
    color: '#808b96',
  },
});

export default CardContact;