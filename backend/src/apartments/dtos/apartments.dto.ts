import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';

export class ListQueryDto {
    others?: string[];

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'search param' })
    q?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    @ApiPropertyOptional({
        description: 'Use it to specify a specific page',
        default: 1,
    })
    page?: number = 1;

    @IsOptional()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    @ApiPropertyOptional({
        description: 'Used it to specify a specific number of records',
        default: 10,
    })
    limit?: number = 10;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional({
        description: 'Use it to specify a field to sort records by',
        default: 'created_at',
    })
    sortBy?: string = 'created_at';

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc'])
    @ApiPropertyOptional({
        description:
            'Used for pagination to sort records in a specific direction',
        default: 'desc',
    })
    sortDir?: Prisma.SortOrder = 'desc';
}

export class CreateOneBodyDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '379 San Francisco' })
    name: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 379 })
    building_number: string;

    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    @ApiProperty({ example: 3256232 })
    price: number;
}

export class FindOneParamDto {
    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
