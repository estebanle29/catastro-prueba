import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles.css';

const PropietariosQuery = gql`
  query Propietarios {
    propietarios {
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

const CreatePropietarioMutation = gql`
  mutation CreatePropietario($input: CreatePropietarioInput!) {
    createPropietario(input: $input) {
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



const CrearPropietario = () => {
    const [nuevoPropietario, setNuevoPropietario] = useState({});
    const [createPropietario] = useMutation(CreatePropietarioMutation);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNuevoPropietario({ ...nuevoPropietario, [name]: value });
    };
    const validarFormulario = () => {
        const {
            nombres,
            apellidos,
            tipo_propietario,
            tipo_documento,
            numero_documento,
            telefono,
            correo_electronico,
        } = nuevoPropietario;

        
        if (
            !nombres ||
            !apellidos ||
            !tipo_propietario ||
            !tipo_documento ||
            !numero_documento ||
            !telefono
        ) {
            setErrorMessage('Por favor, complete todos los campos obligatorios.');
            return false;
        }

        
        if (tipo_documento === 'CC' && numero_documento.length !== 10) {
            setErrorMessage('El número de documento de una CC debe tener 10 dígitos.');
            return false;
        }

       
        if (telefono.length !== 10) {
            setErrorMessage('El número de teléfono debe tener 10 dígitos.');
            return false;
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo_electronico && !emailRegex.test(correo_electronico)) {
            setErrorMessage('Por favor, ingrese un correo electrónico válido.');
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
            await createPropietario({
                variables: { input: nuevoPropietario },
                refetchQueries: [{ query: PropietariosQuery }],
            });
            setNuevoPropietario({});
            setErrorMessage('');
            navigate('/propietarios')
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleCancelar = () => {

        navigate('/propietarios');
    };

    return (
        <div>
            <h1>Crear Nuevo Propietario</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombres"
                    value={nuevoPropietario.nombres || ''}
                    placeholder="Nombres"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                <input
                    type="text"
                    name="apellidos"
                    value={nuevoPropietario.apellidos || ''}
                    placeholder="Apellidos"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                <label>Tipo de Propietario:</label>
                <select
                    name="tipo_propietario"
                    value={nuevoPropietario.tipo_propietario || ''}
                    onChange={handleInputChange}
                    className="input-spacing"
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="Persona_natural">Persona natural</option>
                    <option value="Persona_juridica">Persona jurídica</option>
                </select>
                <label>Tipo de Documento:</label>
                <select
                    name="tipo_documento"
                    value={nuevoPropietario.tipo_documento || ''}
                    onChange={handleInputChange}
                    className="input-spacing"
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="CC">CC</option>
                    <option value="NIT">NIT</option>
                </select>
                <input
                    type="text"
                    name="numero_documento"
                    value={nuevoPropietario.numero_documento || ''}
                    placeholder="Número de Documento"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                <label>Razon Social:</label>
                <select
                    name="razon_social"
                    value={nuevoPropietario.razon_social || ''}
                    onChange={handleInputChange}
                    className="input-spacing"
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="No_Aplica">No Aplica</option>
                    <option value="Sociedad_Anonima">Sociedad Anonima</option>
                    <option value="Sociedad_Limitada">Sociedad Limitada</option>
                    <option value="Sociedad_Comercial">Sociedad Comercial</option>
                </select>
                <input
                    type="text"
                    name="direccion"
                    value={nuevoPropietario.direccion || ''}
                    placeholder="Dirección"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                <input
                    type="text"
                    name="telefono"
                    value={nuevoPropietario.telefono || ''}
                    placeholder="Teléfono"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                <input
                    type="text"
                    name="correo_electronico"
                    value={nuevoPropietario.correo_electronico || ''}
                    placeholder="Correo Electrónico"
                    onChange={handleInputChange}
                    className="input-spacing"
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="buttons-container">
                    <button type="button" onClick={handleCancelar} className='mr-2'>Cancelar</button>
                    <button type="submit" >Crear Propietario</button>
                </div>
            </form>
        </div>
    );
};

export default CrearPropietario;
