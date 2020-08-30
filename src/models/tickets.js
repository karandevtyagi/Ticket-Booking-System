module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('Tickets', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
    timing: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter timing'
        }
      }
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  })
  return Tickets
}
