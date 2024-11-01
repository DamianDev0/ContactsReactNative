import {Location} from './Map.interface';

export interface Contact {
  name: string;
  phone: string;
  email: string;
  photo?: string | null;
  role?: string | null;
  location?: Location | null;
}
