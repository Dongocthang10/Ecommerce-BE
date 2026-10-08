import { Column, Entity, ForeignKey, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity()
@Index(['providerId', 'accountId'], { unique: true })
export class Account extends BaseUuidEntity {
    @Index()
    @Column({ type: 'uuid'})
    userId: string

    @Column({ type: 'text'})
    accountId: string

    @Column({ type: 'text'})
    providerId: string

    @Column({ type: 'text', nullable: true})
    accessToken: string

    @Column({ type: 'text', nullable: true})
    refreshToken: string

    @Column({ type: 'timestamptz', nullable: true})
    accessTokenExpiresAt: Date | null

    @Column({ type: 'timestamptz', nullable: true})
    refreshTokenExpiresAt: Date | null

    @Column({ type: 'text', nullable: true})
    scope: string | null

    @Column({ type: 'text', nullable: true})
    idToken: string | null

    @Column({ type: 'text', nullable: true})    
    password: string | null

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id'})
    user: User
}