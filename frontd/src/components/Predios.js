import React from 'react';
import { gql, useQuery } from '@apollo/client';

const PREDIOS_QUERY = gql`
  query {
    predios {
    avaluo
    departamento
    municipio
    nombre
    numero_predial
    construcciones {
      area_total
      direccion
      numero_pisos
      tipo_construccion
    }
    propietario {
      apellidos
      nombres
      correo_electronico
      tipo_documento
      numero_documento
    }
    terreno {
      area
      cerca_fuentes_agua
      construcciones_presentes
      tipo_terreno
      valor_comercial
    }
  }
  }
`;

const Predios = () => {
  const { loading, error, data } = useQuery(PREDIOS_QUERY);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Predios</h1>
      {data.predios.map((predio) => (
        <div key={predio.predio_id}>
          <h2>{predio.nombre}</h2>
          <p>Número Predial: {predio.numero_predial}</p>
          <p>Avalúo: {predio.avaluo}</p>
          <p>Departamento: {predio.departamento}</p>
          <p>Municipio: {predio.municipio}</p>
          <p>Propietario: {predio.propietario.nombre} {predio.propietario.apellido}</p>
          <p>Correo del Propietario: {predio.propietario.correo}</p>
          <h3>Construcciones:</h3>
          {predio.construcciones.map((construccion) => (
            <div key={construccion.construccion_id}>
              <p>Número de Pisos: {construccion.numero_pisos}</p>
              <p>Área Total: {construccion.area_total}</p>
              <p>Tipo de Construcción: {construccion.tipo_construccion}</p>
              <p>Dirección: {construccion.direccion}</p>
            </div>
          ))}
          <h3>Terreno:</h3>
          <p>Área: {predio.terreno.area}</p>
          <p>Valor Comercial: {predio.terreno.valor_comercial}</p>
          <p>Cerca Fuentes de Agua: {predio.terreno.cerca_fuentes_agua ? 'Sí' : 'No'}</p>
          <p>Tipo de Terreno: {predio.terreno.tipo_terreno}</p>
          <p>Construcciones Presentes: {predio.terreno.construcciones_presentes ? 'Sí' : 'No'}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Predios;
