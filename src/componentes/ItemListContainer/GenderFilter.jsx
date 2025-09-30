import React from "react";
import "./ItemListContainer.css";

function GenderFilter({ selectedGender, onGenderChange }) {
  return (
    <div className="gender-filter">
      <h3>Filtrar por género:</h3>
      <div className="filter-buttons">
        <button
          className={`filter-button ${selectedGender === "todos" ? "active" : ""}`}
          onClick={() => onGenderChange("todos")}
        >
          Todos
        </button>
        <button
          className={`filter-button ${selectedGender === "hombre" ? "active" : ""}`}
          onClick={() => onGenderChange("hombre")}
        >
          Hombre
        </button>
        <button
          className={`filter-button ${selectedGender === "mujer" ? "active" : ""}`}
          onClick={() => onGenderChange("mujer")}
        >
          Mujer
        </button>
      </div>
    </div>
  );
}

export default GenderFilter;