const { Router } = require("express");
const { bookController } = require("../controllers");

const router = Router();

router.get('/', bookController.getAll);

router.get('/:id', bookController.getById);

module.exports = router;
