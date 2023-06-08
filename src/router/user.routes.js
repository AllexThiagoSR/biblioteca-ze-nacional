const { Router } = require("express");
const { userController } = require("../controllers");

const router = Router();

router.post('/', userController.create);

router.post('/login', userController.login);

module.exports = router;
