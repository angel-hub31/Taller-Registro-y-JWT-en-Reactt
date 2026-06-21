import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar el Provider
import Login from './pages/Login'; 
import Perfil from './pages/Perfil';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas: el componente ProtectedRoute envuelve a las rutas privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;