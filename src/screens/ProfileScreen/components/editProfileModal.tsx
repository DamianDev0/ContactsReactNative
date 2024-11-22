import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import useEditProfile from '../hooks/useModalEditPorfile';
import Loader from '../../../components/Loader';
import GenericButton from '../../../components/GenericButton';

const {width, height} = Dimensions.get('screen');

interface EditProfileModalProps {
  visible: boolean;
  profile: {name: string; phone: string; photo: string | null};
  onSave: (updatedContact: {
    name: string;
    phone: string;
    photo: string | null;
  }) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  profile,
  onSave,
  onClose,
}) => {
  const {
    name,
    setName,
    phone,
    setPhone,
    photo,
    selectImage,
    handleSave,
    isLoading,
    setPhoto,
  } = useEditProfile({
    name: profile.name,
    phone: profile.phone,
    photo: profile.photo,
    onSave,
    onClose,
  });

  useEffect(() => {
    if (visible) {
      setName(profile.name);
      setPhone(profile.phone);
      setPhoto(profile.photo);
    }
  }, [visible, profile, setName, setPhone, setPhoto]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>

          <TouchableOpacity onPress={selectImage}>
            <Image
              source={
                photo ? {uri: photo} : require('../../../assets/img/avatar.png')
              }
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Name"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="Phone"
          />

          {isLoading ? (
            <Loader />
          ) : (
            <View style={styles.buttonContainer}>
              <GenericButton
                title="Save"
                onPress={handleSave}
                backgroundColor="#000"
                color="#FFF"
                width={120}
              />
              <GenericButton
                title="Close"
                onPress={onClose}
                backgroundColor="#000"
                color="#FFF"
                width={120}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.6,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    width: width * 0.8,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    marginTop: 20,
  },
});

export default EditProfileModal;
