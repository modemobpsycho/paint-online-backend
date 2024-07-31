/*
  Warnings:

  - You are about to drop the `_UserDrawings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserDrawings" DROP CONSTRAINT "_UserDrawings_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserDrawings" DROP CONSTRAINT "_UserDrawings_B_fkey";

-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_UserDrawings";

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
