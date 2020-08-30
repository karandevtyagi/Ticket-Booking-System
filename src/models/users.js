module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    phone_number: {
      type: DataTypes.BIGINT(11),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: {
          msg: 'Please enter number'
        }
      }
    }
  })
  return Users
}
