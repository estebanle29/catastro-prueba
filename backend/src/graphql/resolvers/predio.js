export default {
  Query: {
    predios: (_, __, { models }) => {
      return models.Predio.findAll({
        include: [
          {
            model: models.Propietario,
            include: [
              {
                model: models.Terreno
              }
            ]
          },
          {
            model: models.Construccion
          }
        ]
      });
    },
    predio: (_, { predio_id }, { models }) => {
      return models.Predio.findByPk(predio_id, {
        include: [
          {
            model: models.Propietario,
            include: [
              {
                model: models.Terreno
              }
            ]
          },
          {
            model: models.Construccion
          }
        ]
      });
    }
  },
  Mutation: {
    createPredio: (_, { input }, { models }) => {
      return models.Predio.create({ ...input });
    }
  }
};
