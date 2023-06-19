const userService = require('../services/user');

module.export = {
    getAll: async (req, res) => {
        try {
            const {
                page, itemsPerPage, order, ...filters
            } = req.query;
            const users = await userService.findAll(filters, {order, limit: itemsPerPage, offset: (page - 1) * itemsPerPage});

            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getOne: async (req, res) => {
        const {id} = req.params;
        try {
            const user = await userService.findOne(parseInt(id, 10));
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({error: 'User not found'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    create: async (req, res) => {
        try {
            const user = await userService.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}