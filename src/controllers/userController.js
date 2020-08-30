const { Users, Tickets } = require('../models')
module.exports = {
  // To add new user
  async add (req, res) {
    try {
      const user = await Users.create(req.body)
      res.send({
        user: user.toJSON()
      })
    } catch (err) {
      res.status(400).send({
        error: 'Error occured while adding new user'
      })
    }
  },
  // To show user details based on ticketid
  async show (req, res) {
    try {
      const ticket = await Tickets.findOne({
        where: {
          id: req.body.ticketid
        }
      })
      if (!ticket) {
        return res.status(403).send({
          error: 'You do not have access to this ticket.'
        })
      }
      const user = await Users.findOne({
        where: {
          id: ticket.userid
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Unable to load user details'
      })
    }
  }
}
