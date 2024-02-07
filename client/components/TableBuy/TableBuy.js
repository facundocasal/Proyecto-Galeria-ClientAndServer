import "bootstrap/dist/css/bootstrap.css";

import Table from "react-bootstrap/Table";
import styles from "../../styles/Home.module.css";

const TableBuy = ({ data, role }) => {
  return (
    <div>
      <h5 className={styles.title}>
        {role === "client" ? "Compras" : "Ventas"}
      </h5>
      {data.length === 0 ? (
        <p className="text-white">
          No tienes {role === "client" ? "compras" : "ventas"}
        </p>
      ) : (
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>#</th>
              {role === "client" ? <th>Artis</th> : ""}
              <th>Galeria</th>
              <th>Fecha de Compra</th>
              <th>{role === "client" ? "Disponible" : "Precio de Venta"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i}>
                <td>{data.indexOf(i) + 1}</td>
                {role === "client" ? <td>{i.artis}</td> : ""}
                <td>{i.galleryName}</td>
                <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                {role === "artis" ? (
                  <td>
                    {i.method === "mercado Pago" ? "$" : "US$"} {i.price}{" "}
                  </td>
                ) : (
                  <td>{i.available ? "Si" : "Vencida"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TableBuy;
