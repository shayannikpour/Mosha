-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
