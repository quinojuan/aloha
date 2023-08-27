import React, { useEffect, useState } from "react";
import XLSX from "xlsx/dist/xlsx.full.min.js";
import "./App.css";
import "/node_modules/primeflex/primeflex.css";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFile = () => {
    const file = "/productos2.xls"; // Reemplaza 'nombre-del-archivo.xlsx' con el nombre de tu archivo Excel

    fetch(file)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const dataJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const filteredData = dataJson.filter((product) => {
          const productCode = product[0]?.toString(); // Obtén el código del producto de la primera columna

          // Realiza la comparación y devuelve true si el código del producto incluye el término de búsqueda
          return productCode && productCode.includes(searchTerm);
        });

        setJsonData(filteredData);
        console.log({ filteredData });
      })
      .catch((error) => {
        console.error("Error al cargar el archivo:", error);
      });
  };

  useEffect(() => {
    handleFile();
  }, [searchTerm]);

  return (
    <div className="flex flex-column align-items-center min-w-screen min-h-screen">
      <h1 className="text-7xl">ALOHA</h1>
      <input
        className="surface-100 text-2xl"
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm == "" ? (
        <p>Ingrese el código de un producto</p>
      ) : (
        jsonData && (
          <table className="w-9">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Venta</th>
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {row.slice(0, 3).map((cell, cell_idx) => (
                    <td key={cell_idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default App;
