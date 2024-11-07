import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GenericButton from '../../components/GenericButton';
import { useFormContact } from './hook/UseContactManagerHook';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import FormInputs from './components/FormInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapModal from '../MapScreen/components/ModalMap';

const { width } = Dimensions.get('screen');

interface LatLng {
  latitude: number;
  longitude: number;
}

const FormScreen: React.FC = () => {
  const { form, handleChange, handleSubmit, selectImage, takePhoto } = useFormContact();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const onSubmit = async () => {
    if (selectedLocation) {
      try {
        await AsyncStorage.setItem(
          'contactLocation',
          JSON.stringify(selectedLocation),
        );
        form.location = selectedLocation;
      } catch (error) {
        console.error('Error saving location:', error);
      }
    }

    try {
      await handleSubmit();
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerAnimation}>
          <LottieView
            source={require('../../assets/animations/figureFom.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.title}>New Contact</Text>
        <FormInputs
          form={form}
          handleChange={handleChange}
          selectImage={selectImage}
          takePhoto={takePhoto}
        />

        <GenericButton
          title="Select Location"
          backgroundColor="#000"
          width={350}
          height={40}
          onPress={() => setModalVisible(true)}
        />

        <View style={styles.containerButtons}>
          <GenericButton
            title="Add"
            backgroundColor="#000"
            width={130}
            height={45}
            onPress={onSubmit}
          />
          <GenericButton
            title="Cancel"
            backgroundColor="#000"
            width={130}
            height={45}
            onPress={() => navigation.goBack()}
          />
        </View>

        <MapModal
          visible={modalVisible}
          onSave={(location) => setSelectedLocation(location)}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  containerButtons: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,
  },
  lottie: {
    width: width * 1.1,
    height: width * 0.8,
  },
  containerAnimation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
  },
});

export default FormScreen;
