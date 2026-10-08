import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";

@Entity()
export class Category extends BaseUuidEntity {
    @Column({type: 'varchar', length: 50})
    name: string

    @Column({type: 'text', nullable: true})
    description: string | null

    @Column({type: 'text', nullable: true})
    image_key: string | null

    @Column({type: 'varchar', length: 100, unique: true})
    slug: string

    @Index()
    @Column({type: 'uuid', nullable: true})
    parentId: string | null

    @ManyToOne(() => Category, (category) => category.children, {nullable: true})
    @JoinColumn({ name: 'parent_id'})
    parent: Category | null

    @OneToMany(() => Category, (category) => category.parent)
    children: Category[]

    @Column({default: true})
    isActive: boolean | true

    @Column({ type: 'int', default: 1})
    displayOrder: number

    @DeleteDateColumn({type: 'timestamptz'})
    deletedAt: Date

}
