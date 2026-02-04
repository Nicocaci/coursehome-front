import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import UserProfile from "./User/UserProfile.jsx";
import "../../css/pages/Perfiles/Perfil.css";

const Perfil = () => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <div className="perfil-container">
            <h2>No estás autenticado</h2>
            <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>;
    }
    return user.role === 'admin' ? <AdminProfile /> : <UserProfile />;
}

export default Perfil;