import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'John Doe' })
  // why it build failed after adding this line?
  // @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column()
  email: string;
}
