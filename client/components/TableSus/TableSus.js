import "bootstrap/dist/css/bootstrap.css";

import Table from "react-bootstrap/Table";
import styles from "./TableSus.module.css";
import stylesHome from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const TableSus = ({ data }) => {
  const router = useRouter();
  const handleClick = (galleryName) => {
    router.push(`/gallery/${galleryName}`);
  };

  const daysRest = (dateBuy) => {
    const today = new Date().getTime();
    const dif = parseInt(
      31 - (today - dateBuy.getTime()) / (1000 * 60 * 60 * 24),
      10
    );
    return dif;
  };
  return (
    <div>
      <h5 className={stylesHome.title}>Suscripciones Activas</h5>
      {data.length === 0 ? (
        <p className="text-white">No tienes compras</p>
      ) : (
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Artis</th>
              <th>Galeria</th>
              <th>Dias restantes</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (i) =>
                i.available && (
                  <tr>
                    <td>{data.indexOf(i) + 1}</td>
                    <td>{i.artis}</td>
                    <td>{i.galleryName}</td>
                    <td>{daysRest(new Date(i.createdAt))}</td>
                    <td>
                      <button
                        onClick={() => handleClick(i.galleryName)}
                        className={`btn w-50 ms-auto ${styles.button}`}
                      >
                        Ir
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TableSus;
