// components/ContactList.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Contact2 } from '../../../interfaces/Contact.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation.types';

interface ContactListProps {
  contacts: Contact2[];
  loading: boolean;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ContactList: React.FC<ContactListProps> = ({ contacts, loading }) => {
  const navigation = useNavigation<NavigationProp>();

  const sections = useMemo(() => [
    {
      title: 'Contacts',
      data: contacts,
    },
  ], [contacts]);

  const handleContactPress = (contact: Contact2) => {
    navigation.navigate('Details', { contact });
  };

  const renderItem = ({ item }: { item: Contact2 }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)} style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <Text style={styles.emptyMessage}>No contacts available.</Text>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.recordID.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
    color: '#666',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 5,
  },
});

export default ContactList;
