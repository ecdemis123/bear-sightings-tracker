import Sequelize from 'sequelize';
import db from '../db';

const Species = db.define('species', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Species;
