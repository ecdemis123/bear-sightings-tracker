import Sequelize from 'sequelize'
import Sighting from './db/models/Sighting';
import Location from './db/models/Location';
import Species from './db/models/Species';

const Op = Sequelize.Op;

module.exports = {
  getSighting: async (req, res) => {
    let id = req.params.id
    let sighting = await Sighting.findOne({where: {id:id}})
    if (!sighting) {
      return res.status(404)
      .json({ errors: [{ message: 'Sighting not found.' }] })
    } else {
      return res.status(200).json({sighting: sighting})
    }
  },
  searchSighting: async (req, res) => {
    let query = req.query;

    let whereClause = {};

    let zipCode = query.zipCode;
    if (zipCode) {
      let location = await Location.findOne({where:{zipCode: zipCode}});
      if (!location) {
        return res.status(404)
          .json({ errors: [{ message: 'ZipCode not found.' }] })
      } else {
        whereClause.locationId = location.id
      }
    }

    let speciesName = query.species;
    if (speciesName) {
      let species = await Species.findOne({where:{name: speciesName}});
      if (!species) {
        return res.status(404)
          .json({ errors: [{ message: 'Species not found.' }] })
      } else {
        whereClause.speciesId = species.id
      }
    }

    let startDate = query.startDate;
    let endDate = query.endDate;
    if (startDate && endDate) {
      whereClause.createdAt = { [Op.between]: [startDate, endDate] }
    } else if (startDate && !endDate) {
      whereClause.createdAt = { [Op.gte]: startDate }
    } else if (endDate && !startDate) {
      whereClause.createdAt = { [Op.lte]: endDate }
    }

    let numBears = query.numBears;
    let orderClause = [[`${numBears ? 'numBears' : 'createdAt'}`, 'ASC']] //funky

    let sightings = await Sighting.findAll({where: whereClause, order: orderClause})
    if (!sightings) {
      return res.status(404)
        .json({ errors: [{ message: 'Sightings not found.' }] })
    } else {
      return res.status(200).json({sightings:sightings})
    }
  },
  createSighting: (req, res) => {
    let body = req.body
    Location.findOrCreate({where:{zipCode: body.zipCode}})
    .spread((location, created) => {
      Species.findOrCreate({where:{name: body.species}})
      .spread((species, created) => {
        let sighting = Sighting.create({notes: body.notes,numBears: body.numBears,locationId: location.get('id'),speciesId: species.get('id')})
        if (!sighting) {
          return res.status(500).json({ errors: [{ message: 'Error creating Sighting.' }] })
        } else {
          return res.status(201).json({message: 'Sighting successfully created.'})
        }
      })
    })
  }
}
