import {Location} from './Map.interface';

export interface Contact {
  recordID: string;
  name?: string;
  phone?: string;
  email?: string;
  photo?: string | null;
  role?: string | null;
  location?: Location | null;
  displayName?: string | null;
}

export interface Contact2 {
  recordID: string;
  displayName: string | null | undefined;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  photo?: string | null
  location?: Location | null;
  role?: string | null;
}
