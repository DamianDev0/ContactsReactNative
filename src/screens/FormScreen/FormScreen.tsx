import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { useFormContact } from './hook/UseContactManagerHook';
import { useNavigation } from '@react-navigation/native';
import FormInputs from './components/FormInputs';
import MapModal from './components/MapModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('screen');

const FormScreen: React.FC = () => {
  const {
    form,
    handleChange,
    handleSubmit,
    selectImage,
    takePhoto,
    handleSaveLocation,
    isSubmitting,
  } = useFormContact();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const onSubmit = async () => {
    try {
      await handleSubmit();
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to save contact');
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.containerAnimation}>
          <Image
            source={require('../../assets/img/Stylizedoutfit.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.title}>New Contact</Text>
          <FormInputs
            form={{
              name: form.name || '',
              phone: form.phone || '',
              email: form.email || '',
              role: form.role || '',
              photo: form.photo || '',
            }}
            handleChange={handleChange}
            selectImage={selectImage}
            takePhoto={takePhoto}
          />
          <View style={styles.containerButtons}>
            <Icon
              name="check"
              size={30}
              color="#FFF"
              onPress={onSubmit}
              style={styles.iconButton}
              disabled={isSubmitting} 
            />
            <Icon
              name="times"
              size={30}
              color="#FFF"
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            />
            <Icon
              name="map-marker"
              size={30}
              color="#FFF"
              onPress={() => setModalVisible(true)}
              style={styles.iconButton}
            />
          </View>
        </View>
        <MapModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(latitude, longitude) => {
          handleSaveLocation(latitude, longitude, setModalVisible);
        }}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    padding: 20,
    height: 520,
    backgroundColor: '#000',
    borderRadius: 10,
    marginTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 60,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    position: 'absolute',
    top: -width * 0.12,
    zIndex: 1,
  },
  containerAnimation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  iconButton: {
    padding: 10,
  },
});

export default FormScreen;
