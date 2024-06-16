-- CreateTable
CREATE TABLE "Menu" (
    "id" UUID NOT NULL,
    "index" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Menu_index_idx" ON "Menu"("index");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
