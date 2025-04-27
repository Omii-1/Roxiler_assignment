import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";
import { Store } from "./store.model";

@Entity()
export class Rating {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ type: "int", width: 1})
    ratingValue!: number;

    @ManyToOne(() => User, (user) => user.ratings)
    user!: User;

    @ManyToOne(() => Store, (store) => store.ratings)
    store!: Store;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updaedAt!: Date;
}