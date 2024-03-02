import PropsTypes from "prop-types";
import "../styles/buscador.css";

const InputBuscador = ({ value, onChange }) => {
  return (
    <div className="search-inline">
      <input
        name="txtSearch"
        className="search-inline--input"
        placeholder="Escriba el nombre de la categoría"
        value={value}
        onChange={onChange} // Aquí se maneja el cambio en el estado
      />
    </div>
  );
};

InputBuscador.propTypes = {
  value: PropsTypes.string.isRequired,
  onChange: PropsTypes.func.isRequired,
};
export default InputBuscador;
