import React, { useEffect, useMemo, useState } from "react";
import "../css/pages/ProductosPage.css";
import axiosInstance from "../utils/axiosConfig.js";
import { getImageUrl } from "../utils/imageUtils.js";
import { Link, useSearchParams } from "react-router-dom";
import { IoFilter } from "react-icons/io5";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      subcategory: searchParams.get("subcategory") || "",
      page: Number(searchParams.get("page")) || 1,
      sort: searchParams.get("sort") || "",
    };
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get("/api/products", { params: filters })
      .then((res) => {
        setProductos(res.data.products || []);
        setPagination(res.data.pagination);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    axiosInstance.get("/api/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (!filters.category) {
      setSubcategories([]);
      return;
    }

    axiosInstance
      .get(`/api/products/subcategories/${filters.category}`)
      .then((res) => setSubcategories(res.data));
  }, [filters.category]);

  const updateParams = (key, value, resetPage = true) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);

      if (value) p.set(key, value);
      else p.delete(key);

      if (resetPage) {
        p.set("page", 1);
      } else if (!p.get("page")) {
        p.set("page", 1);
      }

      return p;
    });
  };

  return (
    <div className="product-section">
      <h2 className="titulo-productos center">Productos</h2>

      <div className="products-layout">
        {/* Botón filtros mobile */}
        <button
          className="mobile-filter-btn"
          onClick={() => setFiltersOpen(true)}
        >
          <IoFilter />
          Filtrar
        </button>

        {/* Overlay */}
        {filtersOpen && (
          <div
            className="filter-overlay"
            onClick={() => setFiltersOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`filter-sidebar ${filtersOpen ? "open" : ""}`}>
          <button
            className="close-filters"
            onClick={() => setFiltersOpen(false)}
          >
            ✕
          </button>

          <label className="filter-label">Buscar</label>
          <input
            type="search"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => updateParams("search", e.target.value)}
            className="product-search-input"
          />

          <hr style={{ margin: "12px 0" }} />

          <label className="filter-label">Categoría</label>
          <select
            value={filters.category}
            onChange={(e) => {
              setSearchParams((prev) => {
                const p = new URLSearchParams(prev);
                const value = e.target.value;

                if (value) p.set("category", value);
                else p.delete("category");

                p.delete("subcategory");
                p.set("page", 1);

                return p;
              });
            }}
            className="product-search-input"
          >
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="filter-label" style={{ marginTop: 8 }}>
            Subcategoría
          </label>
          <select
            value={filters.subcategory}
            onChange={(e) => updateParams("subcategory", e.target.value)}
            className="product-search-input"
          >
            <option value="">Todas</option>
            {subcategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label className="filter-label" style={{ marginTop: 8 }}>
            Ordenar por
          </label>
          <select
            value={filters.sort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="product-search-input"
          >
            <option value="">Sin orden</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
          </select>
        </aside>

        {/* MAIN */}
        <main className="products-main">
          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p>Cargando Productos</p>
            </div>
          )}

          {!loading && productos?.length === 0 && (
            <p>No hay productos disponibles.</p>
          )}
          {!loading && (
            <div className="cards-container">
            {productos?.map((p) => (
              <Link
                className="li-none-black"
                to={`/productos/${p._id}`}
                key={p._id}
              >
                <div className="product-card">
                  <div className="card-img-productos">
                    <img
                      src={getImageUrl(
                        Array.isArray(p.imagen) ? p.imagen[0] : p.imagen,
                      )}
                      alt={p.name}
                      className="product-card-imagen"
                      onError={(e) => (e.target.src = "/vite.svg")}
                    />
                  </div>
                  <div className="product-card-description">
                    <h3 className="product-card-text">{p.name}</h3>
                    <p className="product-card-text">${p.precio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}


          {pagination?.totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`page-btn ${
                    pagination.page === i + 1 ? "active-page" : ""
                  }`}
                  onClick={() => updateParams("page", i + 1, false)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductosPage;
