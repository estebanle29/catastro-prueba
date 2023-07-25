export default {
  Query: {
    propietarios: (_, __, { models }) => {
      return models.Propietario.findAll({
        include: [
          {
            model: models.Predio
          }
        ]
      });
    },
    propietario: (_, { propietario_id }, { models }) => {
      return models.Propietario.findByPk(propietario_id, {
        include: [
          {
            model: models.Predio
          }
        ]
      });
    }
  },
  Mutation: {
    createPropietario: (_, { input }, { models }) => {
      return models.Propietario.create({ ...input });
    },
    updatePropietario: async (_, { propietario_id, input }, { models }) => {
      try {
        
        const propietario = await models.Propietario.findByPk(propietario_id);
        if (!propietario) {
          throw new Error("No se encontró el propietario con el ID proporcionado.");
        }

        await propietario.update(input);

       
        return propietario;
      } catch (error) {
        console.error("Error al actualizar el propietario:", error);
        throw new Error("Hubo un error al actualizar el propietario. Por favor, inténtalo nuevamente.");
      }
    },
    deletePropietario: async (_, { propietario_id }, { models }) => {
      try {
        
        const propietario = await models.Propietario.findByPk(propietario_id);
        if (!propietario) {
          throw new Error("No se encontró el propietario con el ID proporcionado.");
        }

        
        await propietario.destroy();

       
        return true;
      } catch (error) {
        console.error("Error al eliminar el propietario:", error);
        throw new Error("Hubo un error al eliminar el propietario. Por favor, inténtalo nuevamente.");
      }
    },
  },
};
