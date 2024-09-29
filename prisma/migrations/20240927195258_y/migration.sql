/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AddCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "isActiveCart" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "AddCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AddCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sellingPrice" REAL NOT NULL,
    "discountPrice" REAL,
    "quantity" INTEGER NOT NULL,
    "uom" TEXT NOT NULL,
    "hsnCode" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "createdBy", "deletedAt", "description", "discountPrice", "hsnCode", "id", "image", "isActive", "quantity", "sellingPrice", "uom", "updatedAt") SELECT "createdAt", "createdBy", "deletedAt", "description", "discountPrice", "hsnCode", "id", "image", "isActive", "quantity", "sellingPrice", "uom", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "transId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_transId_fkey" FOREIGN KEY ("transId") REFERENCES "TransactionType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("id", "productId", "transId", "userId") SELECT "id", "productId", "transId", "userId" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
