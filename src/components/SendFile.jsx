import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/sendfile",
    element: (
      <form
        action="http://localhost:3000/file"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="archivoExcel"></input>
        <input type="submit" value="Enviar"></input>
      </form>
    )
  }
])


export const SendFile = () => {
  return (
    <>






      
    </>
  );
};
