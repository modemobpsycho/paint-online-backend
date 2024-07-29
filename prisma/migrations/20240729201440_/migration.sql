-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creator" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drawing" (
    "id" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "lineWidth" INTEGER NOT NULL,
    "strokeColor" TEXT NOT NULL,
    "fillColor" TEXT NOT NULL,
    "posX" INTEGER[],
    "posY" INTEGER[],

    CONSTRAINT "Drawing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserDrawings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserDrawings_AB_unique" ON "_UserDrawings"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDrawings_B_index" ON "_UserDrawings"("B");

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDrawings" ADD CONSTRAINT "_UserDrawings_A_fkey" FOREIGN KEY ("A") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDrawings" ADD CONSTRAINT "_UserDrawings_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
