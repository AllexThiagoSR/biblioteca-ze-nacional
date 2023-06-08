const { Router } = require("express");
const { bookController } = require("../controllers");

const router = Router();

router.get('/', bookController.getAll);

router.get('/:id', bookController.getById);

router.post('/borrow');

module.exports = router;
