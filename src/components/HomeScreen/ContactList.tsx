import React from 'react';
import {SectionList, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/ContactListStyles';
import {Contact} from '../../interfaces/Contact.interface';

interface ContactListProps {
  contacts: Contact[];
  onPressContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onPressContact,
}) => {
  const sortedContacts = contacts.sort((nameA, nameB) => nameA.name.localeCompare(nameB.name));

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);

  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      title: letter,
      data: groupedContacts[letter],
    }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.phone}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onPressContact(item)}>
          <View style={styles.contactItem}>
            {item.photo && (
              <Image source={{uri: item.photo}} style={styles.contactPhoto} />
            )}
            <View style={styles.contactDetails}>
              <Text style={styles.contactText}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      style={styles.sectionList}
    />
  );
};

export default ContactList;
