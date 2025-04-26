import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./user.model";
import { Rating } from "./rating.model";

@Entity()
export class Store {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 60})
  name!: string;

  @Column({ length: 400})
  address!: string;

  @ManyToOne(() => User, (rating) => rating.stores)
  owner!: User;

  @ManyToMany(() => Rating, (rating) => rating.store)
  ratings!: Rating[]
}