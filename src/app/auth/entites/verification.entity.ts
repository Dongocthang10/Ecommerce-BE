import { Column, Entity } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";

@Entity()
export class Verification extends BaseUuidEntity {
    @Column({ type: 'text'})
    identifier: string

    @Column({ type: 'text'})
    value: string;

    @Column({ type: 'timestamptz'})
    expiresAt: Date
}