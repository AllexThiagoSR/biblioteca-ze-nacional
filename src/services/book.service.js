const Sequelize = require('sequelize');
const config = require('../config/config');
const { Book, User, Rental } = require('../models');
const todayDate = require('../utils/getDate');
const serviceReturn = require('../utils/mountServiceReturn');

const env = process.env.NOODE_ENV || 'development';

const seq = new Sequelize(config[env]);

const getAll = async () => {
  try {
    const books = await Book.findAll();
    return { status: 200, data: { total: books.length, books } };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

const getById = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) return { status: 404, data: { message: 'Book not found' } };
    return { status: 200, data: book };
  } catch (error) {
    console.log(error.message);
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

const borrow = async (bookId, userId) => {
  const transaction = await seq.transaction();
  const book = await Book.findByPk(bookId);
  if (!book) return serviceReturn(404, `Not found: Book with the id ${bookId}`);
  if (book.isRented) return serviceReturn(409, `Book with id ${bookId} is already borrowed`);
  const user = await User.findByPk(userId);
  if (!user) return serviceReturn(404, `Not found: User with the id ${userId}`)
  try {
    await Book.update({ isRented: true }, { where: { id: bookId }, transaction });
    const date = todayDate();
    await Rental.create({ bookId, userId, rentalDate: date }, { transaction });
    await transaction.commit();
    return serviceReturn(200, `Book with id ${bookId} borrowed by userId ${userId} at ${date}`);
  } catch (err) {
    await transaction.rollback();
    if (err.original.code === 'ER_DUP_ENTRY') {
      return serviceReturn(409, `Sorry! You've already borrowed the book with id ${bookId}`);
    }
    return serviceReturn(409, 'Internal server error');
  }
};

const returnBook = async (bookId, userId) => {
  const transaction = await seq.transaction();
  const book = await Book.findByPk(bookId);
  if (!book) return serviceReturn(404, `Not found: Book with the id ${bookId}`);
  if (!book.isRented) return serviceReturn(409, `Book with id ${bookId} is not borrowed`);
  const user = await User.findByPk(userId);
  if (!user) return serviceReturn(404, `Not found: User with the id ${userId}`)
  try {
    const today = todayDate();
    await Promise.all([
      Book.update({ isRented: false }, { where: { id: bookId }, transaction }),
      Rental.update({ returnedAt: today }, { where: { bookId, userId }, transaction })
    ]);
    await transaction.commit();
    return serviceReturn(200, `Book with id ${bookId} returned by userId ${userId} at ${today}`);
  } catch (error) {
    await transaction.rollback();
    console.log(error.message);
    return serviceReturn(409, 'Internal server error');
  }
};

module.exports = { getAll, getById, borrow, returnBook };
