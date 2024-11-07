// useEditContact.ts
import { useState } from 'react';

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

  const handleSave = () => {
    onSave({ name, phone, email, latitude, longitude });
    onClose();
  };

  const handleMapPress = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { latitude, longitude } = event.nativeEvent.coordinate;
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
