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
import {Contact} from '../../../interfaces/Contact.interface';
import {StackNavigationProp} from '@react-navigation/stack';
import CardContact from './CardContact';
import {RootStackParamList} from '../../../types/navigation.types';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  loadMoreContacts: () => void;
}

const {width} = Dimensions.get('screen');

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  loading,
  loadMoreContacts,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const sections = useMemo(() => {
    const groupedContacts = contacts.reduce((acc, contact) => {
      const firstLetter = contact.name?.charAt(0).toUpperCase() || '#';
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {} as Record<string, Contact[]>);

    return Object.keys(groupedContacts)
      .sort()
      .map(letter => ({
        title: letter,
        data: groupedContacts[letter],
      }));
  }, [contacts]);

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('Details', {contact});
  };

  const renderItem = ({item}: {item: Contact}) => (
    <CardContact item={item} onPress={() => handleContactPress(item)} />
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  const handleEndReached = () => {
    if (!loading && contacts.length >= 5) {
      loadMoreContacts();
    }
  };

  return (
    <View style={styles.container}>
      {loading && contacts.length === 0 ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) =>
            `${item.recordID ?? 'unknown'}-${index}`
          }
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color="#000" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: width * 0.9,
    alignSelf: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 4,
    color: '#000',
  },
});

export default ContactList;
