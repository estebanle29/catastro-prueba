import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import './styles.css';

const Propietarios = gql`
  query Propietarios {
    propietarios {
      propietario_id
      apellidos
      correo_electronico
      direccion
      nombres
      numero_documento
      razon_social
      telefono
      tipo_documento
      tipo_propietario
    }
  }
`;

const DELETE_PROPIETARIO = gql`
  mutation DeletePropietario($propietarioId: UUID!) {
    deletePropietario(propietario_id: $propietarioId)
  }
`;

const PropietarioCard = ({ propietario, onDeletePropietario }) => {
  return (
    <div className="card m-2">
      <div className='card-body'>
        <h2>{propietario.nombres} {propietario.apellidos}</h2>
        <p>Tipo de Propietario: {propietario.tipo_propietario}</p>
        <p>Tipo de Documento: {propietario.tipo_documento}</p>
        <p>Número de Documento: {propietario.numero_documento}</p>
        <p>Dirección: {propietario.direccion}</p>
        <p>Teléfono: {propietario.telefono}</p>
        <p>Correo Electrónico: {propietario.correo_electronico}</p>
        <div className="button-container">
          <Link to={`/propietarios/EditarPropietario/${propietario.propietario_id}`}>
            <button>Editar</button>
          </Link>
          <button onClick={() => onDeletePropietario(propietario.propietario_id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

const Propietario = () => {
  const { error, loading, data, refetch } = useQuery(Propietarios);

  const [deletePropietario] = useMutation(DELETE_PROPIETARIO, {
    onCompleted: () => {
      refetch(); 
    },
    onError: (error) => {
      console.error('Error Borrar propietario:', error);
      
    },
  });

  const handleDeletePropietario = (propietarioId) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este propietario?');
    if (confirmDelete) {
      deletePropietario({ variables: { propietarioId } });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Propietarios</h1>
      <div className='button-container'>
        <Link to="/CrearPropietarios">
          <button className='mr-2'>Crear Propietario</button>
        </Link>
      </div>

      <div className="cards-container">
        {data.propietarios.map((propietario) => (
          <PropietarioCard
            key={propietario.propietario_id}
            propietario={propietario}
            onDeletePropietario={handleDeletePropietario} 
          />
        ))}
      </div>
    </div>
  );
};

export default Propietario;
