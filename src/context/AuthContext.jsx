import { useState, createContext, useContext } from "react"; // IMPORTANTE: Agregar useContext

const AuthContext = createContext();

export function AuthProvider(props) { // Corregido el nombre a AuthProvider
    const { children } = props;
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (nuevoToken) => {
        localStorage.setItem("token", nuevoToken);
        setToken(nuevoToken);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Corregido: 'token' en lugar de 'item'
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}