import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function Login() {
    const [username, setUsername] = useState(''); // Corregido: nombre de variable
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Corregido: uso de setError

    const navigate = useNavigate();
    const { login } = useAuth();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST', 
                headers: {      
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrecta');
            }

            const datos = await response.json();
            login(datos.token);
            navigate('/perfil'); 

        } catch (error) {
            setError(error.message); 
        }
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Ingresar</button>

                    <button type="submit">Registrar</button>
                </div>
                <div>
                <p>¿No tienes cuenta? <Link to="/registrar">Regístrate aquí</Link></p>
            </div>
            </form>
        </div>
    )
}

export default Login;