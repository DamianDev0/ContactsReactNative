import React, {useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Contact2} from '../../../interfaces/Contact.interface';
import {StackNavigationProp} from '@react-navigation/stack';
import CardContact from './CardContact';
import {RootStackParamList} from '../../../types/navigation.types';

interface ContactListProps {
  contacts: Contact2[];
  loading: boolean;
}

const {width} = Dimensions.get('screen');

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ContactList: React.FC<ContactListProps> = ({contacts, loading}) => {
  const navigation = useNavigation<NavigationProp>();

  const sections = useMemo(() => {
    const groupedContacts = contacts.reduce((acc, contact) => {
      const firstLetter = contact.name?.charAt(0).toUpperCase() || '#';
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {} as Record<string, Contact2[]>);

    return Object.keys(groupedContacts)
      .sort()
      .map(letter => ({
        title: letter,
        data: groupedContacts[letter],
      }));
  }, [contacts]);

  const handleContactPress = (contact: Contact2) => {
    navigation.navigate('Details', {contact});
  };

  const renderItem = ({item}: {item: Contact2}) => (
    <CardContact item={item} onPress={handleContactPress} />
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.recordID.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: width * 0.9,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0000',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 4,
  },
});

export default ContactList;
