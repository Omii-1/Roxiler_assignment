import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Rating } from "./rating.model"
import { Store } from "./store.model"

export enum UserRole {
  ADMIN = "admin",
  NORMAL_USER = "normal_user",
  STORE_OWNER = "store_owner"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 60})
  name!: string;

  @Column({ unique: true})
  email!: string;

  @Column()
  password!: string;

  @Column({ length: 400})
  address!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.NORMAL_USER})
  role!: UserRole;

  @OneToMany(() => Store, (store) => store.owner)
  stores!: Store[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings!: Rating[];
  
}