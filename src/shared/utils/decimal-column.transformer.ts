import { ValueTransformer } from "typeorm";
import { nullable } from "zod";

export const decimalColumnTransformer: ValueTransformer = {
    to: (value?: number | null) => value,

    from: (value?: string | number | null) => {
        if (value === null || value === undefined) {
            return null;
        }

        const num =
            typeof value === 'number'
                ? value
                : Number(String(value));

        return Number.isFinite(num) ? num : 0;
    },
};

export const decimalColumn = {
    type: 'decimal' as const,
    precision: 15,
    scale: 2,
    transformer: decimalColumnTransformer
}

export const nullDecimalColumn = {
    ...decimalColumn,
    nullable: true as const
}