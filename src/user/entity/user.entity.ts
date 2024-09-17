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
import { Contacts } from '../../contacts/entity';
import { Passport } from '../../passport/entity/passport.entity';
import { Education } from '../../education/entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'John Doe' })
  name: string;

  @Column({ default: '', unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Contacts, (contact) => contact.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  contacts: Contacts[];

  @OneToOne(() => Passport, (passport) => passport.user, {
    cascade: true,
  })
  @JoinColumn()
  passport: Passport;

  @ManyToMany(() => Education, (education) => education.users, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  education: Education[];
}
