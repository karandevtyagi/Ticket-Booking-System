const { Tickets } = require('../models')
module.exports = {
  // To book ticket
  async book (req, res) {
    try {
      const ticket = await Tickets.create({
        timing: req.body.timing,
        userid: req.body.userid
      })
      res.send(ticket)
    } catch (err) {
      res.send({
        error: 'You account is created but there is an issue in booking ticket. Please try again later '
      })
    }
  },
  // to update ticket timing
  async update (req, res) {
    try {
      await Tickets.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      res.send({
        msg: 'Ticket updated'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while updating your timing'
      })
    }
  },
  // to view ticket based on timings
  async view (req, res) {
    try {
      const tickets = await Tickets.findAll({
        where: {
          timing: req.body.timing
        }
      })
      if (tickets.length > 0) {
        res.send(tickets)
      } else {
        res.status(500).send({
          msg: 'No such tickets found'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'Unable to load tickets'
      })
    }
  },
  // to delete a ticket
  async delete (req, res) {
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
      await ticket.destroy()
      res.send(ticket)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while deleting your ticket'
      })
    }
  }
}
