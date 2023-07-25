import React from 'react';
import { gql, useQuery,useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import './styles.css';

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
const DELETE_CONSTRUCCION = gql`
  mutation DeleteConstruccion($construccionId: UUID!) {
  deleteConstruccion(construccion_id: $construccionId)
}
`;

const ConstruccionCard = ({ construccion,onDeleteConstruccion }) => {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h2>Construcción ID: {construccion.construccion_id}</h2>
        <p>Número de Pisos: {construccion.numero_pisos}</p>
        <p>Área Total: {construccion.area_total}</p>
        <p>Tipo de Construcción: {construccion.tipo_construccion}</p>
        <p>Dirección: {construccion.direccion}</p>
        <div className="button-container">
          <Link to={`/construcciones/EditarConstruccion/${construccion.construccion_id}`}>
            <button>Editar</button>
          </Link>
          <button onClick={()=>onDeleteConstruccion(construccion.construccion_id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

const Construcciones = () => {
  const { error, loading, data, refetch } = useQuery(CONSTRUCCIONES_QUERY);
  const [deleteConstruccion] = useMutation(DELETE_CONSTRUCCION, {
    onCompleted: () => {
      refetch(); 
    },
    onError: (error) => {
      console.error('Error Borrar construccion:', error);
      
    },
  });

  const handleDeleteConstruccion = (construccionId) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar esta Construccion?');
    if (confirmDelete) {
      deleteConstruccion({ variables: { construccionId } });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Construcciones</h1>
      <div className="button-container">
        <Link to="/CrearConstruccion">
          <button className="mr-2">Crear Construcción</button>
        </Link>
        
      </div>

      <div className="cards-container">
        {data.construcciones.map((construccion) => (
          <ConstruccionCard key={construccion.construccion_id} construccion={construccion}
          onDeleteConstruccion={handleDeleteConstruccion} />
        ))}
      </div>
    </div>
  );
};

export default Construcciones;
