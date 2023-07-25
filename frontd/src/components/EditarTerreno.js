import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const TERRENO_QUERY = gql`
  query Terreno($terrenoId: UUID!) {
    terreno(terreno_id: $terrenoId) {
      area
      cerca_fuentes_agua
      construcciones_presentes
      terreno_id
      tipo_terreno
      valor_comercial
    }
  }
`;

const UPDATE_TERRENO_MUTATION = gql`
  mutation UpdateTerreno($terrenoId: UUID!, $input: UpdateTerrenoInput!) {
    updateTerreno(terreno_id: $terrenoId, input: $input) {
      area
      cerca_fuentes_agua
      construcciones_presentes
      terreno_id
      tipo_terreno
      valor_comercial
    }
  }
`;

const EditarTerreno = () => {
  const { terrenoId } = useParams();
  const [terreno, setTerreno] = useState({});
  const [updateTerreno] = useMutation(UPDATE_TERRENO_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(TERRENO_QUERY, {
    variables: { terrenoId },
  });

  useEffect(() => {
    if (!loading && data && data.terreno) {
      setTerreno(data.terreno);
    }
  }, [loading, data, terrenoId]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === 'checkbox' ? checked : value;

    const parsedValue =
      name === 'area' || name === 'valor_comercial' ? parseFloat(newValue) : newValue;

    setTerreno({
      ...terreno,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        const { __typename,terreno_id , ...propData } = terreno;
        await updateTerreno({
        variables: { terrenoId, input: propData },
        refetchQueries:[{query:TERRENO_QUERY}]
      });

      setErrorMessage('');
      navigate('/terrenos');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelar = () => {
    navigate('/terrenos');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Editar Terreno</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="area"
          value={terreno.area || ''}
          placeholder="Área"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="number"
          name="valor_comercial"
          value={terreno.valor_comercial || ''}
          placeholder="Valor Comercial"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <div className="checkbox-container">
          <label className="checkbox-label" htmlFor="cerca_fuentes_agua">
            Cerca Fuentes Agua
          </label>
          <input
            type="checkbox"
            name="cerca_fuentes_agua"
            checked={terreno.cerca_fuentes_agua}
            onChange={handleInputChange}
            id="cerca_fuentes_agua"
          />
        </div>
        <input
          type="text"
          name="tipo_terreno"
          value={terreno.tipo_terreno || ''}
          placeholder="Tipo de Terreno"
          onChange={handleInputChange}
        />
        <div className="checkbox-container">
          <label className="checkbox-label" htmlFor="construcciones_presentes">
            Construcciones Presentes
          </label>
          <input
            type="checkbox"
            name="construcciones_presentes"
            checked={terreno.construcciones_presentes}
            onChange={handleInputChange}
            id="construcciones_presentes"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="buttons-container">
          <button type="button" onClick={handleCancelar} className="mr-2">
            Cancelar
          </button>
          <button type="submit">Actualizar Terreno</button>
        </div>
      </form>
    </div>
  );
};

export default EditarTerreno;
