export default (sequelize, { DataTypes, UUID, UUIDV4 }) => {
  const Predio = sequelize.define('Predio', {
    predio_id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    numero_predial: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    avaluo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    departamento: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  });

  Predio.associate = (models) => {
    Predio.hasMany(models.Propietario, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });

    Predio.hasMany(models.Construccion, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });

    Predio.hasOne(models.Terreno, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });
  };

  return Predio;
};
