import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { Product } from "../../product/entities/product.entity.js";

@Entity()
@Index('uq_primary_image_per_product', ['productId'], {
    unique: true,
    where: '"is_primary" = true'
})
export class ProductImage extends BaseUuidEntity {
    @Column({type: 'uuid', unique: true})
    @Index()
    productId: string

    @Column({type: 'text'})
    imageKey: string

    @Column({type: 'varchar', length: 255, nullable: true})
    altText: string

    @Column({type: 'int', default: 0})
    displayOrder: number

    @Column({type: 'boolean', default: false})
    isPrimary: boolean

    @ManyToOne(() => Product, {onDelete: "CASCADE"})
    @JoinColumn({name: 'product_id'})
    product: Product
}
