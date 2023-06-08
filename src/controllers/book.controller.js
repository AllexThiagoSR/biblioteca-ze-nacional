const { bookService } = require("../services");

const getAll = async (_req, res) => {
  const { status, data } = await bookService.getAll();
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { status, data } = await bookService.getById(req.params.id);
  return res.status(status).json(data);
};

module.exports = { getAll, getById };
