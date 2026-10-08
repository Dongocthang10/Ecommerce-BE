import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { UserRole } from "../../../shared/types/user-role.enum.js";
import { UserGender } from "../../../shared/types/user-gender.enum.js";

@Entity()
export class User extends BaseUuidEntity {
    @Column({ type: 'text'})
    name: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ default: false})
    emailVerified: boolean

    @Column({ type: 'text', nullable: true })
    image: string | null

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
    role: UserRole

    @Column({ type: 'text', nullable: true})
    phone: string | null

    @Column({ type: 'date', nullable: true})
    birthday: Date | null

    @Column({ type: 'enum', enum: UserGender, nullable: true})
    gender: UserGender | null

    @DeleteDateColumn({type: 'timestamptz', nullable: true})
    deleted_at: Date | null

    // @CreateDateColumn({type: 'timestamptz', default: Date.now()})
    // created_at: Date

    // @UpdateDateColumn({ type: 'timestamptz', default: Date.now()})
    // updated_at: Date
}