import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

export enum TodoStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    todoId!: number;

    @Column()
    title!: string;

    @Column({
        type: 'enum',
        enum: TodoStatus,
        default: TodoStatus.PENDING
    })
    status!: TodoStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => User, (user: User) => user.todos)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column()
    userId!: number;
}