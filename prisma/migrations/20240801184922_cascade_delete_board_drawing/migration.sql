-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_boardId_fkey";

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
