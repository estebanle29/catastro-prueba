export default (sequelize, { DataTypes, UUID, UUIDV4 }) => {
  const Construccion = sequelize.define('Construccion', {
    construccion_id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    numero_pisos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tipo_construccion: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(200)
    }
  });

  Construccion.associate = (models) => {
    Construccion.belongsTo(models.Predio, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });
  };

  return Construccion;
};
