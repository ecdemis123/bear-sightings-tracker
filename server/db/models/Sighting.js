import Sequelize from 'sequelize';
import db from '../db';
import Location from './Location'
import Species from './Species'

const Sighting = db.define('sighting', {
  notes: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  numBears: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 1
  }
});

Sighting.belongsTo(Location, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Sighting.belongsTo(Species, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

export default Sighting;
