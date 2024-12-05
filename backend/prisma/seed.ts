import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const demoApartment = () => {
  const city = faker.location.city();
  const building = faker.location.buildingNumber();

  return {
    name: `${building} ${city}`,
    building_number: building,
    price: Number(faker.commerce.price()),
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
