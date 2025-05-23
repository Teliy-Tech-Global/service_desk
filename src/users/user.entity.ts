// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Role } from '../../auth/roles/roles.enum'; // ✅ Use Role enum for safety
import { Role } from '../auth/roles/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}
