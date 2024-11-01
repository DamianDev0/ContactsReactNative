import {Contact} from '../interfaces/Contact.interface';

export type FormInputsProps = {
  form: {
    name: string;
    phone: string;
    email: string;
    role?: string | null;
    photo?: string | null;
  };
  handleChange: (field: keyof Contact, value: string | null) => void;
  selectImage: () => void;
  takePhoto: () => void;
};
