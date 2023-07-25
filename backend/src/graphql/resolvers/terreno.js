export default {
  Query: {
    terrenos: (_, __, { models }) => {
      return models.Terreno.findAll({
        include: [
          {
            model: models.Predio
          }
        ]
      });
    },
    terreno: (_, { terreno_id }, { models }) => {
      return models.Terreno.findByPk(terreno_id, {
        include: [
          {
            model: models.Predio
          }
        ]
      });
    }
  },
  Mutation: {
    createTerreno: (_, { input }, { models }) => {
      return models.Terreno.create({ ...input });
    },
    updateTerreno: async (_, { terreno_id, input }, { models }) => {
      const terreno = await models.Terreno.findByPk(terreno_id);
      if (!terreno) {
        throw new Error(`Terreno con ID ${terreno_id} no encontrado.`);
      }

      await terreno.update(input);
      return terreno;
    },
    deleteTerreno: async (_, { terreno_id }, { models }) => {
      const terreno = await models.Terreno.findByPk(terreno_id);
      if (!terreno) {
        throw new Error(`Terreno con ID ${terreno_id} no encontrado.`);
      }

      await terreno.destroy();
      return true;
    }
  }
};
