export type ROLE = "PUBLIC" | "ADMIN"

export interface User {
  id_user: number;
  nama: string;
  email: string;
  role: ROLE;
  kontak: string;
}