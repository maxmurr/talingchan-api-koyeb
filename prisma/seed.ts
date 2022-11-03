import { products } from "./products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (let product of products) {
        await prisma.product.create({
            data: product,
        });
    }
}

main().catch(error => {
    console.log(error);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})
