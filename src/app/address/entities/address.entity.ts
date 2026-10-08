import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity()
@Index('user_default_address', ['userId'], {
    unique: true,
    where: '"is_default" = true AND "deleted_at" IS NULL',
    
})
export class Address extends BaseUuidEntity {
    @Index()
    @Column({ type: 'uuid' })
    userId: string;

    @Column({ type: 'varchar', length: 100 })
    fullName: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'varchar', length: 100 })
    addressLine1: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    addressLine2: string | null;

    @Column({ type: 'varchar', length: 100 })
    ward: string;

    @Column({ type: 'varchar', length: 100 })
    district: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    postalCode: string | null;

    @Column({ default: false })
    isDefault: boolean;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

}