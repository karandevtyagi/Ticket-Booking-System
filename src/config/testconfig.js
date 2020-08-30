module.exports = {
    port: process.env.PORT || 8081,
    db: {
      database: process.env.DB_TNAME,
      user: process.env.DB_TUSER,
      password: process.env.DB_TPASS,
      options: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'localhost'
      }
    }
  }
  