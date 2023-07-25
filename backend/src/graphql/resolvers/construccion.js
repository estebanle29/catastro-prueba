export default {
  Query: {
    construcciones: (_, __, { models }) => {
      return models.Construccion.findAll({
        include: [
          {
            model: models.Predio
          }
        ]
      });
    },
    construccion: (_, { construccion_id }, { models }) => {
      return models.Construccion.findByPk(construccion_id, {
        include: [
          {
            model: models.Predio
          }
        ]
      });
    }
  },
  Mutation: {
    createConstruccion: (_, { input }, { models }) => {
      return models.Construccion.create({ ...input });
    },
    updateConstruccion: async (_, { construccion_id, input }, { models }) => {
      const construccion = await models.Construccion.findByPk(construccion_id);
      if (!construccion) {
        throw new Error(`Construccion con ID ${construccion_id} no encontrada.`);
      }

      await construccion.update(input);
      return construccion;
    },
    deleteConstruccion: async (_, { construccion_id }, { models }) => {
      const construccion = await models.Construccion.findByPk(construccion_id);
      if (!construccion) {
        throw new Error(`Construccion con ID ${construccion_id} no encontrada.`);
      }

      await construccion.destroy();
      return true;
    }
  }
};
