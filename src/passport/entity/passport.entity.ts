import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Passport {
  @PrimaryColumn()
  code: string;

  @Column({ type: 'date' })
  issuedDate: string;

  @OneToOne(() => User, (user) => user.passport)
  user: User;
}
