import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact2 } from '../../../interfaces/Contact.interface';

interface ContactListProps {
  contacts: Contact2[];
  onPressContact?: (contact: Contact2) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onPressContact }) => {
  if (!contacts || contacts.length === 0) {
    return (
      <View style={styles.noContactsContainer}>
        <Text>Contacts not found.</Text>
      </View>
    );
  }

  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.displayName?.[0].toUpperCase() || '#';
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, Contact2[]>);

  const sections = Object.keys(groupedContacts).map(key => ({
    title: key,
    data: groupedContacts[key],
  }));

  const renderItem = ({ item }: { item: Contact2 }) => (
    <TouchableOpacity onPress={() => onPressContact && onPressContact(item)}>
      <View style={styles.contactContainer}>
        <Text style={styles.contactName}>{item.displayName || 'No name'}</Text>
        {item.phone && <Text style={styles.contactPhone}>{item.phone}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.recordID}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contactContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
  },
  contactPhone: {
    fontSize: 16,
    color: '#555',
  },
  contactEmail: {
    fontSize: 16,
    color: '#555',
  },
});

export default ContactList;
