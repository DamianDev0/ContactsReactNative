import {useState} from 'react';
import Toast from 'react-native-toast-message'; // Importar Toast

interface EditContactProps {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactLatitude: number;
  contactLongitude: number;
  onSave: (updatedContact: {
    name: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
  }) => void;
  onClose: () => void;
}

const useEditContact = ({
  contactName,
  contactPhone,
  contactEmail,
  contactLatitude,
  contactLongitude,
  onSave,
  onClose,
}: EditContactProps) => {
  const [name, setName] = useState(contactName);
  const [phone, setPhone] = useState(contactPhone);
  const [email, setEmail] = useState(contactEmail);
  const [latitude, setLatitude] = useState(contactLatitude);
  const [longitude, setLongitude] = useState(contactLongitude);

  const handleSave = async () => {
    try {
      await onSave({name, phone, email, latitude, longitude});
      onClose();
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Contact updated successfully!',
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Failed to update contact',
        visibilityTime: 3000,
      });
    }
  };

  const handleMapPress = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    latitude,
    longitude,
    handleSave,
    handleMapPress,
  };
};

export default useEditContact;
