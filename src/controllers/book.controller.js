const { bookService } = require("../services");

const getAll = async (_req, res) => {
  const { status, data } = await bookService.getAll();
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { status, data } = await bookService.getById(req.params.id);
  return res.status(status).json(data);
};

const borrow = async (req, res) => {
  const { bookId, userId } = req.body;
  const { status, data } = await bookService.borrow(bookId, userId);
};

module.exports = { getAll, getById, borrow };
