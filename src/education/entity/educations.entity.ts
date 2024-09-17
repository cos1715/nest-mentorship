import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { User } from '../../user/entity';

@Index(['facilityName', 'degree'], { unique: true })
@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: ['Bachelors', 'Masters', 'PhD'] })
  degree: string;

  @Column()
  facilityName: string;

  @ManyToMany(() => User, (user) => user.education)
  users: User[];
}
