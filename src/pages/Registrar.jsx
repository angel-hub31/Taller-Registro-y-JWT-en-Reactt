import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Registrar() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('USER');
    const [mensaje, setMensaje] = useState('');

    const navigate = useNavigate();

    const manejarRegistro = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, rol })
            });

            if (response.status === 201) {
                setMensaje("¡Registro exitoso! Redirigiendo al login...");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                throw new Error("Error al registrar usuario");
            }
        } catch (err) {
            setMensaje(err.message);
        }
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            <form onSubmit={manejarRegistro}>
                <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                <select onChange={(e) => setRol(e.target.value)}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
            <Link to="/login">Volver al Login</Link>
        </div>
    );
}

export default Registrar;