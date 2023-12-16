import express from "express";
import morgan from "morgan";
import xlsx from "xlsx";
import multer from "multer";
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

// Configuracion de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/file", upload.single("archivoExcel"), (req, res) => {
  const buffer = req.file.buffer;

  const workbook = xlsx.read(buffer, { type: "buffer" });
  const nombreHoja = workbook.SheetNames[0];
  const datos = xlsx.utils.sheet_to_json(workbook.Sheets[nombreHoja]);

  console.log("Datos del archivo de Excel: ", datos);
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(port, console.log(`Server running on port ${port}`));
