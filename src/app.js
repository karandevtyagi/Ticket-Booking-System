const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const { sequelize } = require('./models')
const config = require('./config/config')
const app = express()
app.use(morgan('combine'))
app.use(bodyparser.json())
app.use(cors())
require('./routes')(app)

require('./automatedTasks')

sequelize.sync({ force: false }).then(() => {
  app.listen(config.port)
  console.log(`server started on port ${config.port}`)
})
module.exports=app