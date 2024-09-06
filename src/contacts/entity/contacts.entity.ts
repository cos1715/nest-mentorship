import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  // I needed to add this column to the entity
  // is there a way to avoid this?
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
