const {Router} = require("express");
const userController = require("../controllers/user");
const router = new Router();

router.get("/", userController.getAll);
router.post("/", userController.create);

router.get("/:id", userController.getOne);
router.put("/:id", userController.replace);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;