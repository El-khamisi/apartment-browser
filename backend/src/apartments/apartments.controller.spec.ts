import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import environment from 'src/environment';
import { instanceToPlain } from 'class-transformer';

describe('ApartmentsController', () => {
    let controller: ApartmentsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ load: [environment] })],
            controllers: [ApartmentsController],
            providers: [PrismaService, ApartmentsService],
        }).compile();

        controller = module.get<ApartmentsController>(ApartmentsController);
    });
    it('(POST) /apartments', async () => {
        const response = await controller
            .createOne({
                name: 'Apartment#123',
                building_number: '123',
                land_area: 270,
                address: 'LA, US',
                price: 123456,
            })
            .then((res) => instanceToPlain(res));

        expect(response).toEqual(
            expect.objectContaining({
                name: 'Apartment#123',
                building_number: '123',
                price: 123456,
            }),
        );
    });
    it('(GET) /apartments', async () => {
        const response = await controller
            .indexList({
                page: 1,
                limit: 10,
                sortBy: 'created_at',
                sortDir: 'desc',
            })
            .then((res) => instanceToPlain(res));

        expect(response).toMatchObject({
            meta: {
                page: 1,
                limit: 10,
                count: expect.any(Number),
            },
            data: expect.any(Array),
        });

        // Check data structure
        expect(response.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    price: expect.any(Number),
                }),
            ]),
        );
    });
});
