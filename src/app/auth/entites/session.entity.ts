import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity()
export class Session extends BaseUuidEntity {
    @Index()
    @Column({ type: 'text'})
    userId: string

    @Column({type: 'text', unique: true})
    token: string

    @Index()
    @Column({ type: 'timestamptz'})
    expiresAt: Date

    @Column({ type: 'text', nullable: true})
    ipAddress: string | null

    @Column({ type: 'text', nullable: true})
    userAgent: string | null

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId'})
    user: User
}