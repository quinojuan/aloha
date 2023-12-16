const Footer = () => {
  return (
    <>
      <div className="footer">
        <p className="text-base">
          Desarrollado por: Juan Quino -{" "}
          <span className="font-bold">Cel. 11 6030 0518</span>
        </p>
        <p className="mt-2 font-italic">Juan José Castelli - Chaco</p>
        <p className="text-primary text-xs">Actualizado al 14/11/2023</p>
      </div>
      <form action="http://localhost:3000/file" method="post" enctype="multipart/form-data">
        <input type="file" name="archivoExcel"></input>
        <input type="submit" value="Enviar"></input>
      </form>
    </>
  );
};

export default Footer;
