export interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedContact: {
    name: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
  }) => void;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactLatitude: number;
  contactLongitude: number;
}
