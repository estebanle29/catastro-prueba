import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const CONSTRUCCION_QUERY = gql`
  query Construccion($construccionId: UUID!) {
    construccion(construccion_id: $construccionId) {
      area_total
      direccion
      numero_pisos
      tipo_construccion
      construccion_id
    }
  }
`;

const UPDATE_CONSTRUCCION_MUTATION = gql`
  mutation UpdateConstruccion($construccionId: UUID!, $input: UpdateConstruccionInput!) {
    updateConstruccion(construccion_id: $construccionId, input: $input) {
      area_total
      direccion
      numero_pisos
      tipo_construccion
      construccion_id
    }
  }
`;

const EditarConstruccion = () => {
  const { construccionId } = useParams();
  const [construccion, setConstruccion] = useState({});
  const [updateConstruccion] = useMutation(UPDATE_CONSTRUCCION_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(CONSTRUCCION_QUERY, {
    variables: { construccionId },
  });

  useEffect(() => {
    if (!loading && data && data.construccion) {
      setConstruccion(data.construccion);
    }
  }, [loading, data, construccionId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value, 10);
    setConstruccion({
      ...construccion,
      [name]: isNaN(parsedValue) ? value : parsedValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { __typename,construccion_id , ...propData } = construccion;
        
      await updateConstruccion({
        variables: { construccionId, input: propData },
        refetchQueries:[{query:CONSTRUCCION_QUERY}]
      });

      setErrorMessage('');
      navigate('/construcciones');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelar = () => {
    navigate('/construcciones');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Editar Construcción</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="numero_pisos"
          value={construccion.numero_pisos || ''}
          placeholder="Número de Pisos"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="number"
          name="area_total"
          value={construccion.area_total || ''}
          placeholder="Área Total"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="text"
          name="tipo_construccion"
          value={construccion.tipo_construccion || ''}
          placeholder="Tipo de Construcción"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="text"
          name="direccion"
          value={construccion.direccion || ''}
          placeholder="Dirección"
          onChange={handleInputChange}
          className="input-spacing"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="buttons-container">
          <button type="button" onClick={handleCancelar} className="mr-2">
            Cancelar
          </button>
          <button type="submit">Actualizar Construcción</button>
        </div>
      </form>
    </div>
  );
};

export default EditarConstruccion;
