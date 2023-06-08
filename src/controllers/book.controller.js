const { bookService } = require("../services");

const getAll = async (_req, res) => {
  const { status, data } = await bookService.getAll();
  return res.status(status).json(data);
};

module.exports = { getAll };
