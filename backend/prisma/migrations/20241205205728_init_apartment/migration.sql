-- CreateTable
CREATE TABLE "apartments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "building_number" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);
