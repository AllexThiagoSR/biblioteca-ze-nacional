const express = require('express');
const camelize = require('camelize');
const { bookRouter, userRouter } = require('./router');

const app = express();

app.use(express.json());

app.use('/books', bookRouter);

app.use('/users', userRouter);

// app.post('/new/user', async (req, res) => {
//   const { username, password, } = req.body;
//   const [{ insertId }] = await dbConnection.execute(`
//   INSERT INTO users(username, password) VALUES ('${username}', '${password}')`);
//   return res.status(200).json({
//     id: insertId,
//     username,
//     password,
//   })
// });

// app.get('/admin/show/borrows', async (req, res) => {
//   const { secret } = req.headers;
//   if (!secret || secret !== 'seuzenacional') { 
//     return res.status(401).json({
//       message: 'You don\'t have permission to see borrows'
//     })
//   }
//   let { returned } = req.query;
//   let [borrows] = await dbConnection.execute(
//     `SELECT * FROM rentals`
//   )

//   borrows = camelize(borrows);

//   if (returned) {
//     returned = returned === 'true'
//     borrows = borrows.filter((borrow) => returned ? borrow.returnedAt : !borrow.returnedAt)
//   }

//   return res.status(200).json(borrows);
// })

module.exports = app;