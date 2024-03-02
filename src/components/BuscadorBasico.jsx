import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data] = useState([
    "Manzana",
    "Plátano",
    "Naranja",
    "Piña",
    "Fresa",
    "Sandía",
    "Uva",
    "Mango",
    "Limón",
    "Pera",
    "Melocotón",
    "Cereza",
    "Kiwi",
    "Melón",
    "Coco",
  ]);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterResults(term);
  };

  const filterResults = (query) => {
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  return (
    <div>
      <h2>Lista de frutas:</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchTerm
          ? searchResults.map((result, index) => <li key={index}>{result}</li>)
          : data.map((result, index) => <li key={index}>{result}</li>)}
      </ul>
    </div>
  );
};

export default SearchBar;

/**
 *  El componente SearchBar muestra una lista de frutas al principio y actualiza dinámicamente la lista según el término de búsqueda ingresado.
    Utiliza el estado searchTerm para almacenar el término de búsqueda y searchResults para almacenar los resultados de la búsqueda.
    La función handleChange se ejecuta cada vez que cambia el valor del campo de búsqueda y actualiza el estado searchTerm.
    La función filterResults filtra la lista de frutas en base al término de búsqueda y actualiza el estado searchResults.
    El componente renderiza la lista completa al principio y los resultados filtrados según el término de búsqueda, utilizando condicionales en el JSX.
 */
