const express = require('express');
const camelize = require('camelize');
const { dbConnection } = require('./db/connection');

const app = express();

app.use(express.json());

app.get('/books', async (req, res) => {
  let { isRented } = req.query;
  let [livros] = await dbConnection.execute('SELECT * FROM books');
  livros = camelize(livros);
  if (isRented) {
    isRented = isRented === 'true' ? 1 : 0;
    
    livros = livros.filter((livro) => 
      livro.isRented === isRented
    );
  }
  return res.status(200).json({
    total: livros.length,
    livros
  });
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const [[livro]] = await dbConnection.execute(`SELECT * FROM books WHERE id = ${id}`);
  return res.status(200).json(livro)
});

app.post('/books/borrow', async (req, res) => {
  const { bookId, userId } = req.body;

  let [[book]] = await dbConnection.execute(
    `SELECT * FROM books WHERE id = ${bookId}`
  )

  if (!book) { 
    return res.status(404).json({
      message: `Not found: Book with id ${bookId}`
    })
  }

  book = camelize(book);

  if (book.isRented) {
    return res.status(409).json({
      message: `Book with id ${bookId} is already borrowed`
    })
  }
  
  let today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month.length === 1 ? '0' + month : month;
  let day = today.getDate();

  today = year + '-' + month + '-' + day;
  const borrowPromise = dbConnection.execute(
    `INSERT INTO rentals (book_id, user_id, rental_date)
    VALUES (${bookId}, ${userId}, '${today}')`
  );
  const bookBorrowStatus = dbConnection.execute(
    `UPDATE books SET is_rented = 1
    WHERE id = ${bookId}`
  );

  try {
    await Promise.all([borrowPromise, bookBorrowStatus]);

    return res.status(200).json({
      message: `Book with id ${bookId} borrowed by userId ${userId} at ${today}`
    });  
  } catch(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: `Sorry! You've already borrowed the book with id ${bookId}`
      })
    }
    return res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR'
    })
  }
})

app.post('/books/return', async (req, res) => {
  const { bookId, userId } = req.body;
  let [[book]] = await dbConnection.execute(
    `SELECT * FROM books WHERE id = ${bookId}`
  )

  if (!book) { 
    return res.status(404).json({
      message: `Not found: Book with id ${bookId}`
    })
  }

  book = camelize(book);

  if (!book.isRented) {
    return res.status(409).json({
      message: `Book with id ${bookId} is not rented`
    })
  }
  
  let today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month.length === 1 ? '0' + month : month;
  let day = today.getDate();

  today = year + '-' + month + '-' + day;
  const borrowPromise = dbConnection.execute(
    `UPDATE rentals SET returned_at = '${today}'
    WHERE book_id = ${bookId} AND user_id = ${userId}`
  );

  const bookBorrowStatus = dbConnection.execute(
    `UPDATE books SET is_rented = 0
    WHERE id = ${bookId}`
  );

  try {
    await Promise.all([borrowPromise, bookBorrowStatus]);

    return res.status(200).json({
      message: `Book with id ${bookId} returned by userId ${userId} at ${today}`
    });  
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR'
    })
  }
})

app.post('/new/user', async (req, res) => {
  const { username, password, } = req.body;
  const [{ insertId }] = await dbConnection.execute(`
  INSERT INTO users(username, password) VALUES ('${username}', '${password}')`);
  return res.status(200).json({
    id: insertId,
    username,
    password,
  })
});

app.get('/admin/show/borrows', async (req, res) => {
  const { secret } = req.headers;
  if (!secret || secret !== 'seuzenacional') { 
    return res.status(401).json({
      message: 'You don\'t have permission to see borrows'
    })
  }
  let { returned } = req.query;
  let [borrows] = await dbConnection.execute(
    `SELECT * FROM rentals`
  )

  borrows = camelize(borrows);

  if (returned) {
    returned = returned === 'true'
    borrows = borrows.filter((borrow) => returned ? borrow.returnedAt : !borrow.returnedAt)
  }

  return res.status(200).json(borrows);
})

module.exports = app;