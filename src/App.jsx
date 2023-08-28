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
    <div className="flex flex-column align-items-center min-w-screen min-h-screen bg-pink-50">
      <div className="flex align-items-center">

      <img src="/elgalpon.jpeg" alt="imagen" className="mb-4 mt-3 mr-3" />
      <h1 className="title resplandor">Aloha</h1>
      </div>
      <input
        className="surface-100 text-2xl mb-3 p-2 text-center"
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm == "" ? (
        <p className="text-xl text-pink-900">Ingrese el código de un producto</p>
      ) : (
        jsonData && (
          <table className="w-11 my-table">
            <thead>
              <tr>
                <th className="text-left text-xl">Codigo</th>
                <th className="text-left text-xl">Descripcion</th>
                <th className="text-left text-xl">Venta</th>
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
