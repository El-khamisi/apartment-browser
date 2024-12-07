import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const demoApartment = () => {
    const city = faker.location.city();
    const country = faker.location.country();
    const building =
        faker.location.buildingNumber() +
        faker.string.alpha({ casing: 'upper' });

    return {
        name: `${building} ${city}`,
        building_number: building,
        land_area: faker.number.int({ min: 60, max: 300 }),
        about: faker.lorem.lines(),
        address: `${city}, ${country}`,
        images: Array.from({ length: 3 }).map(() => faker.image.url()),
        price: faker.number.int({ min: 100, max: 999999999 }) / 100,
    };
};

const prisma = new PrismaClient();
async function main() {
    await prisma.apartment.createMany({
        data: Array.from({ length: 5 }).map(() => demoApartment()),
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        process.exit(1);
    });
