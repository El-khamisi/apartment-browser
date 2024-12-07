import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';

export class ShortApartmentEntity {
    @ApiProperty()
    id: string;

    @ApiProperty({ example: '379 San Francisco' })
    name: string;

    @Type(() => Number)
    @ApiProperty({ example: 120 })
    land_area: number;

    @Type(() => Number)
    @ApiProperty({ type: Number, example: 3256232 })
    price: Decimal;

    constructor(partial: Partial<ShortApartmentEntity>) {
        Object.assign(this, partial);
    }
}

export class ApartmentEntity {
    @ApiProperty()
    id: string;

    @ApiProperty({ example: '379 San Francisco' })
    name: string;

    @ApiPropertyOptional({ example: 379 })
    building_number?: string;

    @Type(() => Number)
    @ApiProperty({ example: 120 })
    land_area: number;

    @ApiPropertyOptional({
        example: 'Lorem Ipsum is simply dummy text',
    })
    about?: string;

    @ApiProperty({ example: 'downtown, San Francisco' })
    address: string;

    @ApiProperty()
    images: string[];

    @Type(() => Number)
    @ApiProperty({ type: Number, example: 3256232 })
    price: Decimal;

    @ApiProperty({ type: Date, example: new Date() })
    updated_at: Date;

    @ApiProperty({ type: Date, example: new Date() })
    created_at: Date;

    constructor(partial: Partial<ApartmentEntity>) {
        Object.assign(this, partial);
    }
}

export class ApartmentsEntity {
    @ApiProperty({
        example: {
            page: 1,
            limit: 10,
            count: 562,
        },
    })
    meta: {
        page: number;
        limit: number;
        count: number;
    };

    @ApiProperty({ type: [ShortApartmentEntity] })
    data: ShortApartmentEntity[];

    constructor(partial: Partial<ApartmentsEntity>) {
        Object.assign(this, partial);
    }
}
