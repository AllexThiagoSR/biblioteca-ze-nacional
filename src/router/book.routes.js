const { Router } = require("express");
const { bookController } = require("../controllers");

const router = Router();

router.get('/', bookController.getAll);

module.exports = router;
