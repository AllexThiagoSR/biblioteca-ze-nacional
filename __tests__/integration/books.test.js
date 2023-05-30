const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);


describe('Testing Book Routes', function () {
  describe('It should show a book by id', function () {
    it('Show Book with id 1', async function () {
      
      const response = await chai.request(app)
        .get('/books/1');
      
      console.log('passou');
      process.exit(1);
    })
  })
});