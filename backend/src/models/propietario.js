export default (sequelize, { DataTypes, UUID, UUIDV4 }) => {
  const Propietario = sequelize.define('Propietario', {
    propietario_id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    tipo_propietario: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tipo_documento: {
      type: DataTypes.ENUM('CC', 'NIT', 'Otro'),
      allowNull: false
    },
    numero_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nombres: {
      type: DataTypes.STRING(100)
    },
    apellidos: {
      type: DataTypes.STRING(100)
    },
    razon_social: {
      type: DataTypes.STRING(200)
    },
    direccion: {
      type: DataTypes.STRING(200)
    },
    telefono: {
      type: DataTypes.STRING(20)
    },
    correo_electronico: {
      type: DataTypes.STRING(100)
    }
  });

  Propietario.associate = (models) => {
    Propietario.belongsTo(models.Predio, {
      foreignKey: 'predio_id',
      onDelete: 'CASCADE'
    });
  };

  return Propietario;
};
