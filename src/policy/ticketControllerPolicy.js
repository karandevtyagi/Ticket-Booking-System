const { Users, Tickets } = require('../models')
module.exports = {
  async check (req, res, next) {
    try {
      // For a particular timing maximum 20 tickets can be booked.
      const count = await Tickets.findAndCountAll({
        where: {
          timing: req.body.timing
        }
      })
      if (count.count < 20) {
        const user = await Users.findOne({
          where: {
            phone_number: req.body.phone_number
          }
        })
        // If there is a first time user we need to add his details to user table.
        if (user) {
          req.body.userid = user.id
          next()
        } else {
          const newUser = await Users.create(req.body)
          req.body.userid = newUser.id
          next()
        }
      } else {
        res.status(401).send({
          error: 'No more tickets can be booked for this time slot.'
        })
      }
    } catch (err) {
      res.status(401).send({
        error: 'Try again later'
      })
    }
  }
}
