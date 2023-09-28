import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../interface/rol.interface';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['USER'],
  })
  roles: Role[];

  @Column()
  address: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  urlImg: string;

  @Column({
    type: 'timestamp',
    default: () => `timezone('America/Mexico_City', CURRENT_TIMESTAMP`,
  })
  timestamp: Date;
}
