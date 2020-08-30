const userController = require('./controllers/userController')
const ticketController = require('./controllers/ticketController')
const ticketControllerPolicy = require('./policy/ticketControllerPolicy')

module.exports = (app) => {
  app.post('/addUser', userController.add)
  app.post('/book', ticketControllerPolicy.check, ticketController.book)
  app.post('/update_ticket', ticketController.update)
  app.get('/view_ticket', ticketController.view)
  app.delete('/delete_ticket', ticketController.delete)
  app.get('/view_user', userController.show)
}
