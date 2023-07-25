import React, { useEffect, useState } from 'react';
import { gql, useQuery ,useMutation} from '@apollo/client';
import { Link } from 'react-router-dom';
import './styles.css';

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

const DELETE_TERRENO = gql`
  mutation DeleteTerreno($terrenoId: UUID!) {
  deleteTerreno(terreno_id: $terrenoId)
  }
`;

const TerrenoCard = ({ terreno,onDeleteTerreno }) => {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h2>Terreno ID: {terreno.terreno_id}</h2>
        <p>Área: {terreno.area}</p>
        <p>Valor Comercial: {terreno.valor_comercial}</p>
        <p>Cerca Fuentes Agua: {terreno.cerca_fuentes_agua ? 'Sí' : 'No'}</p>
        <p>Tipo de Terreno: {terreno.tipo_terreno}</p>
        <p>Construcciones Presentes: {terreno.construcciones_presentes ? 'Sí' : 'No'}</p>
        <div className="button-container">
          <Link to={`/terrenos/EditarTerreno/${terreno.terreno_id}`}>
            <button>Editar</button>
            </Link>
          <button onClick={() => onDeleteTerreno(terreno.terreno_id)}>Eliminar</button>
          
          
        </div>
      </div>
    </div>
  );
};

const Terrenos = () => {
  const { error, loading, data, refetch } = useQuery(TERRENOS_QUERY);
  const [terrenos, setTerrenos] = useState([]);

  useEffect(() => {
    if (data) {

      setTerrenos(data.terrenos);
    }
  }, [data]);

  const [deleteTerreno] = useMutation(DELETE_TERRENO, {
    onCompleted: () => {
      refetch(); 
    },
    onError: (error) => {
      console.error('Error Borrando Terreno:', error);
      
    },
  });

  const handleDeleteTerreno = (terrenoId) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este Terreno?');
    if (confirmDelete) {
      deleteTerreno({ variables: { terrenoId } });
    }
  };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Terrenos</h1>
      <div className="button-container">
        <Link to="/CrearTerreno">
          <button className="mr-2">Crear Terreno</button>
        </Link>
      </div>

      <div className="cards-container">
        {terrenos.map((terreno) => (
          <TerrenoCard key={terreno.terreno_id} terreno={terreno}
          onDeleteTerreno={handleDeleteTerreno}  />
        ))}
      </div>
    </div>
  );
};

export default Terrenos;
