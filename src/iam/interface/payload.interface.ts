import { Role } from '../enumeration/rol.enum';

export interface Payload {
  id: string;
  email: string;
  rol: Role[];
}
