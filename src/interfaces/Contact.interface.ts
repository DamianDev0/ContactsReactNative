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
  phone?: string | null; // Keep it nullable if you want to handle null cases
}
