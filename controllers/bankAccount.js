const bankAccountService = require('../services/bankAccount');
const userService = require('../services/user');

module.export = {
    getOne: async (req, res) => {
        try {
            const bankAccount = await bankAccountService.findOne(parseInt(req.params.id, 10));

            res.json(bankAccount);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    create: async (req, res) => {

    },

    debit: async (req, res) => {
        const {user_id, amount, bank_account} = req.params;
        const bankAccount = await bankAccountService.findOne(bank_account);
        const user = await userService.findOne(user_id);
        if (bankAccount && user) {
            if (bankAccount.userId !== user.id) {
                res.status(403).json({error: 'Forbidden'});
            }
            if (bankAccount.balance <= amount) {
                res.status(422).json({error: 'Pas assez de thunes'});
            } else if (amount < 0) {
                res.status(422).json({error: 'Montant invalide'});
            }
            try {
                const updatedBankAccount = await bankAccountService.debit(bankAccount, amount);
                res.json(updatedBankAccount);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json({error: 'Bank account or user not found'});
        }
    },

    credit: async (req, res) => {
        const {user_id, amount, bank_account} = req.params;
        const bankAccount = await bankAccountService.findOne(bank_account);
        const user = await userService.findOne(user_id);

        if (bankAccount && user) {
            if (bankAccount.userId !== user.id) {
                res.status(403).json({error: 'Forbidden'});
            }
            if (bankAccount.balance + amount > 1000) {
                res.status(422).json({error: 'Trop de thunes'});
            } else if (amount <= 0) {
                res.status(422).json({error: 'Montant invalide'});
            }
            try {
                const updatedBankAccount = await bankAccountService.debit(bankAccount, amount);
                res.json(updatedBankAccount);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json({error: 'Bank account or user not found'});
        }
    }
}