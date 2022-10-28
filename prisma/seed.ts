import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const customerData: Prisma.CustomerCreateInput[] = [
    {
        name: 'สมปอง',
        tel: '0123456789',
    },
    {
        name: 'สมหมาย',
        tel: '0987654321',
    },
]

const employeeData: Prisma.EmployeeCreateInput[] = [
    {
        name: 'Tanakrit',
        position: 'พนักงานฝ่ายขาย',
        tel: '0998877665',
    },
    {
        name: 'Supakit',
        position: 'หัวหน้าฝ่ายขาย',
        tel: '0112233445',
    }
]

const productData: Prisma.ProductCreateInput[] = [
    {
        name: 'เมล็ดพันธ์แตงกวา',
        price: 100,
    },
    {
        name: 'ปุ๋ยหมัก',
        price: 5000,
    }
]

const unitData: Prisma.UnitCreateInput[] = [
    {
        detail: 'กิโลกรัม',
    },
    {
        detail: 'ลิตร',
    }
]


async function main() {
    console.log(`Start seeding ...`)
    for (const c of customerData) {
        const customer = await prisma.customer.create({
            data: c,
        })
        console.log(`Created customer with id: ${customer.id}`)
    }
    for (const e of employeeData) {
        const employee = await prisma.employee.create({
            data: e,
        })
        console.log(`Create employee with id: ${employee.id}`)
    }
    for (const p of productData) {
        const product = await prisma.product.create({
            data: p,
        })
        console.log(`Create product with id: ${product.id}`)
    }
    for (const u of unitData) {
        const unit = await prisma.unit.create({
            data: u,
        })
        console.log(`Create unit with id: ${unit.id}`)
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })