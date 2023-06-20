const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
module.exports = {
    findOne: async (libelle) => {
        return prisma.bankAccount.findUnique({
            where: {
                libelle: libelle
            }
        });
    },

    debit: async (bankAccount, amount) => {
        return prisma.bankAccount.update({
            where: {
                libelle: bankAccount.libelle
            },
            data: {
                balance: {
                    decrement: amount
                }
            }
        });
    },

    credit: async (bankAccount, amount) => {
        return prisma.bankAccount.update({
            where: {
                libelle: bankAccount.libelle
            },
            data: {
                balance: {
                    increment: amount
                }
            }
        });
    }
}