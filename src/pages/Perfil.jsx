import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importación faltante
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig"; // Importación necesaria

function Perfil() {
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { // Corregido: sintaxis de useEffect
        const cargarPerfil = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/perfil`, { // Corregido: comillas invertidas
                    headers: {
                        'Authorization': `Bearer ${token}` // Corregido: comillas invertidas
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudo cargar el perfil, inicie sesión nuevamente');
                }

                const datos = await response.json();
                setDatosPerfil(datos);
            } catch (err) {
                setError(err.message);
            }
        };

        if (token) {
            cargarPerfil();
        }
    }, [token]);

    const manejarLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })

        } catch (err) {
            console.log("Error de red al intentar revocar al token: " + err)

        }
        logout();
        navigate('/login')
    }

    // Manejo de carga o error antes de renderizar
    if (error) return <div>Error: {error}</div>;
    if (!datosPerfil) return <div>Cargando...</div>;

    return (
        <div>
            <div>
                <h2>Perfil de Usuario</h2>
                <button onClick={manejarLogout}>Cerrar Sesión</button>
            </div>

            {error && <p>{error}</p>}
            {datosPerfil && (
                <div>
                    <p>Mensaje: {datosPerfil.Mensaje}</p>     {/* Cambiado a M mayúscula */}
                    <p>Usuario: {datosPerfil.Usuario}</p>     {/* Cambiado a U mayúscula */}
                    <p>Rol: {datosPerfil.rol_detectado}</p>   {/* Este está bien */}
                    <p>Status: {datosPerfil.status}</p>       {/* Este está bien */}
                </div>
            )}

        </div>
    );
}

export default Perfil;