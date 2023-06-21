import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
