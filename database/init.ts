
  import { PrismaService } from './db';
  import * as bcrypt from 'bcrypt';
  import { country, state } from 'country/country';
import { products } from 'product/product';
  
  async function addRoles(prisma: PrismaService) {
    const count = (await prisma.roles.count()) == 0;
    const roles = ['user', 'Admin'];
    if (count) {
      await prisma.roles.createMany({
        data: roles.map((e) => ({ name: e })),
      });
    }
  }
  async function addGender(prisma: PrismaService) {
    const count = (await prisma.gender.count()) == 0;
    const gend = ['Male', 'Female'];
    if (count) {
      for (const iter of gend) {
        await prisma.gender.create({
          data: {
            name: iter,
          },
        });
      }
    }
  }
  async function transType(prisma: PrismaService) {
    const count = (await prisma.transactionType.count()) == 0;
    const type = ['Online', 'Offline'];
    if (count) {
      for (const iter of type) {
        await prisma.transactionType.create({
          data: {
            type: iter,
          },
        });
      }
    }
  }
  async function addDefaultUser(prisma: PrismaService) {
    const countUser = (await prisma.user.count()) == 0;
    const saltOrRounds = 10;
    const password = 'venu@123';
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  
    if (countUser) {
      await prisma.user.create({
        data: {
          username: 'venukumar',
          email: 'venukumar@gmail.com',
          mobile: '6380666892',
          password: hashedPassword,
          roleId: 2,
          genderId: 1,
        },
      });
    }
  }
  async function product(prisma: PrismaService) {
    const productSample= products;

    const count = (await prisma.product.count()) == 0;
  
     if (count) {
      for (const product of productSample) {
        await prisma.product.create({
          data: {
            description: product.description,
            image: product.image,
            sellingPrice: product.sellingPrice,
            discountPrice: product.discountPrice,
            quantity: product.quantity,
            uom: product.uom,
            hsnCode: product.hsnCode,
            createdBy: product.createdBy,
          },
        });
      }
      
      console.log("product sample created"); 
     }
  }
  async function addCountry(prisma: PrismaService) {
    const count = (await prisma.country.count()) == 0;
  
    if (count) {
      for (const data of country) {
        await prisma.country.create({
          data: {
            name: data.Name,
            dialCode: data.DailCode,
            timezoneOffset: data.TimeOffset,
          },
        });
      }
    }
  }
  
  async function addState(prisma: PrismaService) {
    const count = (await prisma.state.count()) == 0;
    if (count) {
      for (const data of state) {
        await prisma.state.create({
          data: {
            name: data,
            countryId: 77,
          },
        });
      }
    }
  }

  export default async function initDatabase(prisma: PrismaService) {
    await addRoles(prisma);
    await addGender(prisma);
    await addDefaultUser(prisma);
    await addCountry(prisma);
    await addState(prisma);
    await transType(prisma);
    await product(prisma)
  }
  