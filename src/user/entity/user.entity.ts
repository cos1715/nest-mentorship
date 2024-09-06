import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Contacts } from '../../contacts/entity/contacts.entity';
import { Passport } from './passport.entity';
import { Education } from './educations.entity';

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
  @OneToMany(() => Contacts, (contact) => contact.user, {
    cascade: true,
    orphanedRowAction: 'delete', // read more about this
  })
  contacts: Contacts[];

  @OneToOne(() => Passport, (passport) => passport.user, { cascade: true })
  @JoinColumn()
  passport: Passport;

  @ManyToMany(() => Education, (education) => education.users)
  @JoinTable()
  education: Education[];
}
