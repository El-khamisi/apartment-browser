import { Injectable } from '@nestjs/common';
import { CreateOneBodyDto, ListQueryDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    ApartmentEntity,
    ApartmentsEntity,
    ShortApartmentEntity,
} from './entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApartmentsService {
    constructor(private prisma: PrismaService) {}

    async createOne(body: CreateOneBodyDto) {
        const apartment = await this.prisma.apartment.create({
            data: body,
        });

        return new ApartmentEntity(apartment);
    }

    async findOne(apartmentId: string) {
        const apartment = await this.prisma.apartment.findUniqueOrThrow({
            where: { id: apartmentId },
        });

        return new ApartmentEntity(apartment);
    }

    async indexList(query: ListQueryDto) {
        const { q, page, limit, sortBy, sortDir } = query;

        const whereCond: Prisma.ApartmentWhereInput = {
            name: {
                contains: q,
                mode: 'insensitive',
            },
        };
        const apartments = await this.prisma.apartment.findMany({
            where: whereCond,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: sortDir,
            },
            select: {
                id: true,
                name: true,
                land_area: true,
                images: true,
                price: true,
            },
        });
        const apartmentCounts = await this.prisma.apartment.count({
            where: whereCond,
        });

        return new ApartmentsEntity({
            meta: {
                page,
                count: apartmentCounts,
                limit,
            },
            data: apartments.map((apt) => new ShortApartmentEntity(apt)),
        });
    }
}
