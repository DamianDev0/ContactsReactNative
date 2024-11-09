import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../../types/navigation.types';
import {useContactDetails} from './hook/ContactDetailsHook';
import useContacts from '../HomeScreen/hook/useContacts';
import Loader from '../../components/Loader';
import EditModal from './components/EditModal';
import CustomToast from '../../components/CustomToast';
import ActionButtons from './components/ActionButtons';
import WeatherImage from './components/WeatherImage';
import DeleteModal from './components/DeleteModal';
import useImageUploader from './hook/useImage';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
const {width, height} = Dimensions.get('screen');

const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  const {contact} = route.params;
  const {refreshContacts} = useContacts();

  const {
    contactData,
    loading,
    isModalVisible,
    toastMessage,
    toastType,
    setModalVisible,
    deleteContact,
    handleSaveContact,
    closeModal,
    weather,
  } = useContactDetails(contact.recordID, contact);

  const {selectImage, uploading} = useImageUploader({
    contactId: contactData.recordID ?? '',
    onImageUpload: (photoUrl: string) => (contactData.photo = photoUrl),
    refreshContacts,
  });
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  if (loading || uploading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="edit" size={24} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
              <Icon name="trash" size={24} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                style={styles.image}
                source={
                  contactData.photo
                    ? {uri: contactData.photo}
                    : require('../../assets/img/avatar.png')
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{contactData.name}</Text>
          <Text style={styles.role}>{contactData.role}</Text>

          <ActionButtons
            email={contactData.email ?? 'Not assigned'}
            phone={contactData.phone ?? 'Not assigned'}
          />
        </View>

        {weather && (
          <View style={styles.weatherCard}>
            <WeatherImage weather={weather} />
            <View>
              <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
              <Text style={styles.weatherDescription}>
                {weather.weather[0].description}
              </Text>
            </View>
          </View>
        )}

        {contactData.latitude && contactData.longitude ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: contactData.latitude,
                longitude: contactData.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              zoomEnabled={true}
              scrollEnabled={true}
              showsCompass={true}>
              <Marker
                coordinate={{
                  latitude: contactData.latitude,
                  longitude: contactData.longitude,
                }}
                description="Ubicación del contacto"
              />
            </MapView>
          </View>
        ) : (
          <View style={styles.noLocationContainer}>
            <Image
              source={require('../../assets/img/notfoundmap.png')}
              style={styles.noLocationImage}
            />
            <Text style={styles.noLocationText}>No location available</Text>
          </View>
        )}
        <EditModal
          visible={isModalVisible}
          onClose={closeModal}
          onSave={updatedContact =>
            handleSaveContact(updatedContact, refreshContacts)
          }
          contactName={contactData.name || ''}
          contactPhone={contactData.phone || ''}
          contactEmail={contactData.email || ''}
          contactLatitude={contactData.latitude || 0}
          contactLongitude={contactData.longitude || 0}
        />

        {toastMessage && toastType && (
          <CustomToast text1={toastMessage} type={toastType} />
        )}

        <DeleteModal
          visible={isDeleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={() => {
            deleteContact(refreshContacts);
            setDeleteModalVisible(false);
          }}
          contactName={contactData?.name ?? undefined}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#000',
    width: width,
    height: height * 0.4,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  actionIcons: {
    position: 'absolute',
    top: 15,
    right: 20,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
    marginTop: 15,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FFF',
  },
  role: {
    fontSize: 14,
    color: '#808b96',
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  weatherCard: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    width: width * 0.9,
    height: 130,
    flexDirection: 'row',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 10,
  },
  weatherText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 10,
  },
  weatherDescription: {
    fontSize: 14,
    color: '#808b96',
    textTransform: 'capitalize',
  },
  mapContainer: {
    width: width * 0.9,
    height: 262,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  map: {
    flex: 1,
  },

  noLocationContainer: {
    width: width * 0.9,
    height: 422,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noLocationImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  noLocationText: {
    marginTop: 10,
    fontSize: 20,
    color: '#555',
    fontWeight: 'heavy',
    textAlign: 'center',
  },
});

export default DetailsScreen;
