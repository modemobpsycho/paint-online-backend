/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "User2" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User2_username_key" ON "User2"("username");

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
