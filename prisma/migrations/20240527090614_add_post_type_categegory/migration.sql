/*
  Warnings:

  - A unique constraint covering the columns `[title,typeTitle,categoryTitle]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryTitle" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "typeTitle" TEXT NOT NULL DEFAULT 'blog';

-- CreateTable
CREATE TABLE "Type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL DEFAULT 'blog',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL DEFAULT 'default',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_title_key" ON "Type"("title");

-- CreateIndex
CREATE INDEX "Type_title_idx" ON "Type"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_typeTitle_categoryTitle_key" ON "Post"("title", "typeTitle", "categoryTitle");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_typeTitle_fkey" FOREIGN KEY ("typeTitle") REFERENCES "Type"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
