import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const TERRENOS_QUERY = gql`
  query Terrenos {
    terrenos {
      area
      cerca_fuentes_agua
      construcciones_presentes
      terreno_id
      tipo_terreno
      valor_comercial
    }
  }
`;

const CREATE_TERRENO_MUTATION = gql`
  mutation CreateTerreno($input: CreateTerrenoInput!) {
    createTerreno(input: $input) {
      area
      cerca_fuentes_agua
      construcciones_presentes
      terreno_id
      tipo_terreno
      valor_comercial
    }
  }
`;

const CrearTerreno = () => {
  const [nuevoTerreno, setNuevoTerreno] = useState({
    cerca_fuentes_agua: false, // Establecer valor inicial en false
    construcciones_presentes: false, // Establecer valor inicial en false
  });
  const [createTerreno] = useMutation(CREATE_TERRENO_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === 'checkbox' ? checked : value;

    const parsedValue =
      name === 'area' || name === 'valor_comercial' ? parseFloat(newValue) : newValue;

    setNuevoTerreno({
      ...nuevoTerreno,
      [name]: parsedValue,
    });
  };
  const validarFormulario = () => {
    const { area, valor_comercial, tipo_terreno } = nuevoTerreno;


    if (!area || !valor_comercial || !tipo_terreno) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return false;
    }


    
    const tipoTerrenoRegex = /^(rural|urbano)$/i;
    if (!tipoTerrenoRegex.test(tipo_terreno)) {
      setErrorMessage('Por favor, ingrese un Tipo de Terreno válido ("rural" o "urbano").');
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
      await createTerreno({
        variables: { input: nuevoTerreno },
        refetchQueries: [{ query: TERRENOS_QUERY }],
      });

      setNuevoTerreno({});
      setErrorMessage('');
      navigate('/terrenos');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelar = () => {
    navigate('/terrenos');
  };

  return (
    <div>
      <h1>Crear Nuevo Terreno</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="area"
          value={nuevoTerreno.area || ''}
          placeholder="Área"
          onChange={handleInputChange}
          className="input-spacing"
        />
        <input
          type="number"
          name="valor_comercial"
          value={nuevoTerreno.valor_comercial || ''}
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
            checked={nuevoTerreno.cerca_fuentes_agua}
            onChange={handleInputChange}
            id="cerca_fuentes_agua"
          />
        </div>
        <input
          type="text"
          name="tipo_terreno"
          value={nuevoTerreno.tipo_terreno || ''}
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
            checked={nuevoTerreno.construcciones_presentes}
            onChange={handleInputChange}
            id="construcciones_presentes"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="buttons-container">
          <button type="button" onClick={handleCancelar} className="mr-2">
            Cancelar
          </button>
          <button type="submit">Crear Terreno</button>
        </div>
      </form>
    </div>
  );
};

export default CrearTerreno;
