import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
module.exports = {

    findAll: async (filters, options) => {
        return prisma.user.findMany({
            where: filters,
            ...options
        });
    },

    findOne: async (id) => {
        return prisma.user.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        });
    },

    create: async (data) => {
        return prisma.user.create({
            data
        });
    },
}