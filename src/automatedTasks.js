const cron = require('node-cron')
const { Tickets, sequelize } = require('./models')

// To delete the expired tickets
module.exports = cron.schedule('0 0 */2 * * *', async function () {
  try {
    const tickets = await Tickets.findAll({
      where: (sequelize.literal('CURRENT_TIME') - sequelize.col('timing') > '080000')
    })
    tickets.map(async (ticket) => await ticket.destroy())
  } catch (err) {
    console.log('There is an issue in automated task one.Please check the logs.')
  }
})
