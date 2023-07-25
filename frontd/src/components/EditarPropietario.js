import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const PropietarioQuery = gql`
  query Propietario($propietarioId: UUID!) {
    propietario(propietario_id: $propietarioId) {
      propietario_id
      tipo_propietario
      tipo_documento
      numero_documento
      nombres
      apellidos
      razon_social
      direccion
      telefono
      correo_electronico
    }
  }
`;

const UpdatePropietarioMutation = gql`
  mutation UpdatePropietario($propietarioId: UUID!, $input: UpdatePropietarioInput!) {
    updatePropietario(propietario_id: $propietarioId, input: $input) {
      propietario_id
      tipo_propietario
      tipo_documento
      numero_documento
      nombres
      apellidos
      razon_social
      direccion
      telefono
      correo_electronico
    }
  }
`;

const EditarPropietario = () => {
  const { propietarioId } = useParams();
  const [propietario, setPropietario] = useState({});
  const [updatePropietario] = useMutation(UpdatePropietarioMutation);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const { loading, error, data } = useQuery(PropietarioQuery, {
    variables: { propietarioId },
  });

  useEffect(() => {
    if (!loading && data && data.propietario) {
      setPropietario(data.propietario);
    }
  }, [loading, data, propietarioId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropietario({ ...propietario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { __typename,propietario_id , ...propData } = propietario;
      console.log("Datos del propietario:", propietario);

      await updatePropietario({
        variables: { propietarioId, input: propData },
        refetchQueries:[{query:PropietarioQuery}]
      });
      
      setErrorMessage('');
      navigate('/propietarios');
    } catch (error) {
      console.error("Error en la mutación:", error);
      setErrorMessage(error.message);
    }
  };

  const handleCancelar = () => {
    navigate('/propietarios');
  };

  return (
    <div>
      <h1>Editar Propietario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombres:</label>
          <input
            type="text"
            name="nombres"
            value={propietario.nombres || ''}
            placeholder="Nombres"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={propietario.apellidos || ''}
            placeholder="Apellidos"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Propietario:</label>
          <select
            name="tipo_propietario"
            value={propietario.tipo_propietario || ''}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo</option>
            <option value="Persona_natural">Persona natural</option>
            <option value="Persona_juridica">Persona jurídica</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tipo de Documento:</label>
          <select
            name="tipo_documento"
            value={propietario.tipo_documento || ''}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo</option>
            <option value="CC">CC</option>
            <option value="NIT">NIT</option>
          </select>
        </div>
        <div className="form-group">
          <label>Número de Documento:</label>
          <input
            type="text"
            name="numero_documento"
            value={propietario.numero_documento || ''}
            placeholder="Número de Documento"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Razón Social:</label>
          <select
            name="razon_social"
            value={propietario.razon_social || ''}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo</option>
            <option value="No_Aplica">No Aplica</option>
            <option value="Sociedad_Anonima">Sociedad Anonima</option>
            <option value="Sociedad_Limitada">Sociedad Limitada</option>
          </select>
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={propietario.direccion || ''}
            placeholder="Dirección"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={propietario.telefono || ''}
            placeholder="Teléfono"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo_electronico"
            value={propietario.correo_electronico || ''}
            placeholder="Correo Electrónico"
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons-container">
        <button type="button" onClick={handleCancelar} className="mr-2">
            Cancelar
          </button>
          <button type="submit">Actualizar Propietario</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default EditarPropietario;
