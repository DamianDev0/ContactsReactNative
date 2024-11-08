export interface Contact {
  recordID: string;
  displayName: string | null | undefined;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  photo?: string | null
  role?: string | null;
  latitude?: number | null | undefined;
  longitude?: number | null | undefined
}
