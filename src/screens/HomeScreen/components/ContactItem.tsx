import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Contact} from '../../../interfaces/Contact.interface';

interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({contact, onPress}) => {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={onPress}>
      <View>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
        <Text style={styles.contactEmail}>{contact.email}</Text>
      </View>
      {contact.photo && (
        <Image source={{uri: contact.photo}} style={styles.contactImage} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contactPhone: {
    color: '#000',
  },
  contactEmail: {
    color: '#000',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ContactItem;
