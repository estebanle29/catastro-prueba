import Sequelize from 'sequelize';
import { $db } from '../../config';

const { database, username, password, dialect } = $db();

const sequelize = new Sequelize(database, username, password, {
  dialect,
  define: {
    underscored: true
  }
});

const models = {
  Predio: require('./predio').default(sequelize, Sequelize),
  Construccion: require('./construccion').default(sequelize, Sequelize),
  Propietario: require('./propietario').default(sequelize, Sequelize),
  Terreno: require('./terreno').default(sequelize, Sequelize)
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

export default models;
