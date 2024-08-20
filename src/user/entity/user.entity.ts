import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Contact } from './contacts.entity';
import { Passport } from './passport.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'John Doe' })
  // why it build failed after adding this line?
  // @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ default: '' })
  email: string;

  // why userId was added?
  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true })
  contacts: Contact[];

  @OneToOne(() => Passport, (passport) => passport.user, { cascade: true })
  @JoinColumn()
  passport: Passport;
}
