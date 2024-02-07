import { React, useEffect, useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import clientAxios from '../../config/clientAxios';
import styles from './salesTable.module.css';

const SalesTable = () => {
  const PageSize = 15;
  const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesFilter, setSalesFilter] = useState([]);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = startIndex + PageSize;
  const currentSales = salesFilter.slice(startIndex, endIndex);
  const totalPages = Math.ceil(salesFilter.length / PageSize);
  const getSales = async () => {
    clientAxios.get('/purchase').then((response) => {
      if (response.status !== 400) {
        setIsLoading(true);
        response.data.reverse();
        setSales(response.data);
        setSalesFilter(response.data);
      }
    });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(async () => {
    await getSales();
    console.log('sales', sales);
  }, []);

  return (
    <div className="container my-5">
      <h1 className={`${styles.table}`}>Ventas</h1>
      <div className="row">
        {!isLoading ? (
          <h1 className={`mt-2 ${styles.table}`}>
            Cargando <Spinner animation="grow" size="sm" />{' '}
            <Spinner animation="grow" size="sm" />
          </h1>
        ) : (
          <table className={`table vh-100 ${styles.table} `}>
            <thead>
              <tr className={`${styles.categories}`}>
                <th scope="col">Fecha</th>
                <th scope="col">Usuario</th>
                <th scope="col">Activo</th>
                <th scope="col">Modelo</th>
                <th scope="col">Galeria</th>
                <th scope="col">Metodo</th>
                <th scope="col">Precio</th>
                <th scope="col">Comisión</th>
              </tr>
            </thead>
            <tbody>
              {currentSales.map((sale, i) => (
                <tr key={i} className={`${styles.tableBody}`}>
                  <td>
                    {new Date(sale.createdAt).toLocaleDateString('es-AR')}
                  </td>
                  <td>
                    {sale.userName} / {sale.emailUser ? sale.emailUser : ''}{' '}
                  </td>
                  <td>{sale.available ? '🟢' : '🔴'}</td>
                  <td>{sale.artis}</td>
                  <td>{sale.galleryName}</td>
                  <td>{sale.method}</td>
                  <td>
                    {sale.method === 'mercado Pago' ? '$' : 'USD'} {sale.price}
                  </td>
                  <td>
                    {sale.method === 'mercado Pago' ? '$' : 'USD'}{' '}
                    {sale.commission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <nav className="mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button
                  className={` page-link ${styles.categories}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={'page-item'}>
                  <button
                    className={` page-link ${styles.categories}  ${
                      currentPage === index + 1 && styles.activePage
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages && 'disabled'
                }`}
              >
                <button
                  className={` page-link ${styles.categories}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default SalesTable;
