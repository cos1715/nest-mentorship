import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Passport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ type: 'date' })
  issuedDate: string;

  @OneToOne(() => User, (user) => user.id, { cascade: true })
  user: User;
}
