import { useState, useEffect } from "react";
import axios from "axios";
import InputBuscador from "../components/InputBuscador";

const Buscador = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url_api = "https://www.themealdb.com/api/json/v1/1/categories.php";
      try {
        const response = await axios.get(url_api);
        setData(response.data.categories);
      } catch (error) {
        console.log("Error en la carga");
      } finally {
        // Después de 5 segundos, establecer loading en falso
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#db9008",
        }}>
        Cargando productos, espere...
      </div>
    );
  }

  // Función para generar un precio aleatorio entre 5 y 20
  const generarPrecioAleatorio = () => {
    return (Math.random() * (20 - 5) + 5).toFixed(2);
  };

  // Función para truncar la descripción a las primeras 20 palabras
  const truncarDescripcion = (descripcion) => {
    const palabras = descripcion.split(" ");
    if (palabras.length > 20) {
      return palabras.slice(0, 20).join(" ") + "...";
    } else {
      return descripcion;
    }
  };

  /**
   * La función filteredData filtra la matriz data buscando elementos cuya propiedad strCategory contiene el término de búsqueda searchTerm, sin distinguir entre mayúsculas y minúsculas. El resultado es una nueva matriz con los elementos que coinciden con el criterio de búsqueda.
   * La función filteredData se ejecuta cada vez que hay un cambio en el estado data o searchTerm, ya que está definida como una constante que depende de estos estados.
   */
  const filteredData = data.filter((item) => {
    return item.strCategory.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <InputBuscador
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="menu mt-5">
        <div className="menu-group">
          {filteredData.map((item, index) => {
            // Genera el precio original aleatorio
            const precioOriginal = generarPrecioAleatorio();
            // Calcula el precio aumentado en un 3%
            const precioAumentado = precioOriginal * 1.03;

            return (
              <div className="menu-item" key={index}>
                <img
                  className="menu-item-image"
                  src={item.strCategoryThumb}
                  alt={item.strCategory}
                />
                <div className="menu-item-text">
                  <h3 className="menu-item-heading">
                    <span
                      className="menu-item-name"
                      style={{ color: "#db9008" }}>
                      {item.strCategory}
                    </span>
                    <span className="menu-item-price">
                      ${precioAumentado.toFixed(2)}
                    </span>
                  </h3>
                  <p className="menu-item-description">
                    {truncarDescripcion(item.strCategoryDescription)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Buscador;
