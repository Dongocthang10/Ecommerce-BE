import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUuidEntity } from "../../../config/database/base-uuid.entity.js";
import { Category } from "../../category/entities/category.entity.js";
import { decimalColumn, decimalColumnTransformer, nullDecimalColumn } from "../../../shared/utils/decimal-column.transformer.js";

@Entity()
@Index('idx_product_featured', ['isFeatured'], {
    where: '"is_featured" = true AND "is_active" = true AND "deleted_at" IS NULL'
})
export class Product extends BaseUuidEntity {
    @Index()
    @Column({type: 'uuid', unique: true})
    categoryId: string

    @Column({type: 'varchar', length: 255})
    name: string

    @Column({type: 'text', nullable: true})
    shortDescription: string | null

    @Column({type: 'text', nullable: true})
    description: string | null

    @Column({ type: 'varchar', length: 255, unique: true})
    slug: string

    @Column(decimalColumn)
    price: number

    @Column(nullDecimalColumn)
    basePrice: number | null

    @Column({ type: 'int', default: 0})
    stockQuantity: number

    @Column({ type: 'varchar', length: 100, unique: true})
    sku: string

    @Column({default: true})
    isActive: boolean

    @Column({default: false})
    isFeatured: boolean

    @Column({default: false})
    hasVariants: boolean

    @Column({default: 0})
    viewCount: number

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 2,
        default: 0,
        transformer: decimalColumnTransformer
    })
    ratingAverage: number

    @Column({default: 0})
    reviewCount: number

    @Column(nullDecimalColumn)
    weight: number

    @DeleteDateColumn({type: 'timestamptz'})
    deletedAt: Date | null

    @ManyToOne(() => Category)
    @JoinColumn({name: 'category_id'})
    category: Category
}
