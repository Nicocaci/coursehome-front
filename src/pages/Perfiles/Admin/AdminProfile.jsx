import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Swal from "sweetalert2";
import AdminProd from "./AdminProd.jsx";
import "../../../css/pages/Perfiles/AdminProd.css";
import AdminUserlist from "./AdminUserlist.jsx";
import AdminVentas from "./Ventas/AdminVentas.jsx";

const AdminProfile = ({ user }) => {
  const { getUsers, getProfile, user: authUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [activeSection, setActiveSection] = useState("usuarios");

  //Cargar usuarios y perfil de admin
  useEffect(() => {
    const loadUsersAndProfile = async () => {
      setLoading(true);
      try {
        const [usersData, profileData] = await Promise.all([
          getUsers(),
          getProfile(),
        ]);
        setUsers(usersData);
        setAdminData(profileData);
      } catch (error) {
        console.error("Error al obtener usuarios o perfil:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudieron cargar los datos",
          confirmButtonColor: "#d33",
        });
      }
    };
    loadUsersAndProfile();
    setLoading(false);
  }, [getUsers, getProfile]);

  if (loading) {
    return <div>Cargando perfil de administrador...</div>;
  }

  return (
    <>
      <div className="admin-container">
        <div className="titulo-admin-container">
          <h1 className="titulo-admin">Panel de Administrador</h1>
          <p className="titulo-bienvenido center">
            Bienvenido, {adminData?.nombre || "Administrador"}!
          </p>
        </div>

        {/* Estadisticas de usuarios */}
        <div className="admin-stats">
          <div className="stats-card">
            <h3>Total de Usuarios</h3>
            <p>{users.length}</p>
          </div>
          <div className="stats-card">
            <h3>Usuarios Activos</h3>
            <p>{users.filter((u) => u.role === "user").length}</p>
          </div>
          <div className="stats-card admin ">
            <h3>Administradores</h3>
            <p>{users.filter((u) => u.role === "admin").length}</p>
          </div>
        </div>

        {/* Navegación de secciones para evitar scroll muy largos */}
        <div className="admin-nav">
          <button
            type="button"
            className={`admin-nav-btn ${activeSection === "usuarios" ? "active" : ""}`}
            onClick={() => setActiveSection("usuarios")}
          >
            Gestión de Usuarios
          </button>
          <button
            type="button"
            className={`admin-nav-btn ${activeSection === "productos" ? "active" : ""}`}
            onClick={() => setActiveSection("productos")}
          >
            Gestion de Productos
          </button>
          <button
            type="button"
            className={`admin-nav-btn ${activeSection === "ventas" ? "active" : ""}`}
            onClick={() => setActiveSection("ventas")}
          >
            Gestion de Ventas
          </button>
        </div>

        {activeSection === "productos" && <AdminProd />}
        {activeSection === "usuarios" && <AdminUserlist />}
        {activeSection === "ventas" && <AdminVentas />}
      </div>
    </>
  );
};

export default AdminProfile;
