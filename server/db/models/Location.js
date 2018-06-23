import Sequelize from 'sequelize';
import db from '../db';

const Location = db.define('location', {
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default Location;
