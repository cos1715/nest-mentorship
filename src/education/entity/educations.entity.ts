import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../user/entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: ['Bachelors', 'Masters', 'PhD'] })
  degree: string;

  @Column({ unique: true })
  facilityName: string;

  @ManyToMany(() => User, (user) => user.education)
  users: User[];
}
