const { Book } = require('../models');
const getAll = async () => {
  try {
    const books = await Book.findAll();
    return { status: 200, data: books };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

module.exports = { getAll };
