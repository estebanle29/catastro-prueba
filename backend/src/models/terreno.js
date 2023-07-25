export default (sequelize, { DataTypes, UUID, UUIDV4 }) => {
  const Terreno = sequelize.define('Terreno', {
    terreno_id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    valor_comercial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cerca_fuentes_agua: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tipo_terreno: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    construcciones_presentes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Terreno.associate = (models) => {
    Terreno.belongsTo(models.Predio, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });
  };

  return Terreno;
};
