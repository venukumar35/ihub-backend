/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `Product` table. All the data in the column will be lost.

*/
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
    "userId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "createdBy", "deletedAt", "description", "discountPrice", "hsnCode", "id", "image", "isActive", "quantity", "sellingPrice", "uom", "updatedAt", "userId") SELECT "createdAt", "createdBy", "deletedAt", "description", "discountPrice", "hsnCode", "id", "image", "isActive", "quantity", "sellingPrice", "uom", "updatedAt", "userId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
