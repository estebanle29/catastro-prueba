import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const CONSTRUCCIONES_QUERY = gql`
  query Construcciones {
    construcciones {
    area_total
    construccion_id
    direccion
    numero_pisos
    predio_id
    tipo_construccion
  }
  }
`;

const CREATE_CONSTRUCCION_MUTATION = gql`
  mutation CreateConstruccion($input: CreateConstruccionInput!) {
    createConstruccion(input: $input) {
      area_total
      direccion
      numero_pisos
      tipo_construccion
      construccion_id
    }
  }
`;

const CrearConstruccion = () => {
  const [nuevaConstruccion, setNuevaConstruccion] = useState({});
  const [createConstruccion] = useMutation(CREATE_CONSTRUCCION_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value, 10);
    setNuevaConstruccion({
      ...nuevaConstruccion,
      [name]: isNaN(parsedValue) ? value : parsedValue,
    });
  };


  const validarFormulario = () => {
    const { numero_pisos, area_total, tipo_construccion, direccion } = nuevaConstruccion;

    
    if (!numero_pisos || !area_total || !tipo_construccion || !direccion) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return false;
    }

   
    const tipoConstruccionRegex = /^(industrial|comercial|residencial)$/i;
    if (!tipoConstruccionRegex.test(tipo_construccion)) {
      setErrorMessage('Por favor, ingrese un Tipo de Construcción válido (industrial, comercial o residencial).');
      return false;
    }

    return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const esFormularioValido = validarFormulario();
      if (!esFormularioValido) {
        return;
      }
      await createConstruccion({
        variables: { input: nuevaConstruccion },
        refetchQueries: [{ query: CONSTRUCCIONES_QUERY }]
      });

      setNuevaConstruccion({});
      setErrorMessage('');
      navigate('/construcciones');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelar = () => {
    navigate('/construcciones');
  };

  return (
    <div>
      <h1>Crear Nueva Construcción</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="numero_pisos"
          value={nuevaConstruccion.numero_pisos || ''}
          placeholder="Número de Pisos"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="number"
          name="area_total"
          value={nuevaConstruccion.area_total || ''}
          placeholder="Área Total"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="text"
          name="tipo_construccion"
          value={nuevaConstruccion.tipo_construccion || ''}
          placeholder="Tipo de Construcción"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="text"
          name="direccion"
          value={nuevaConstruccion.direccion || ''}
          placeholder="Dirección"
          onChange={handleInputChange}
          className="input-spacing"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="buttons-container">
          <button type="button" onClick={handleCancelar} className="mr-2">
            Cancelar
          </button>
          <button type="submit">Crear Construcción</button>
        </div>
      </form>
    </div>
  );
};

export default CrearConstruccion;
