/* eslint-disable no-underscore-dangle */

import { React, useEffect, useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import clientAxios from '../../config/clientAxios';
import styles from './userViewer.module.css';

const UserViewer = () => {
  const PageSize = 15;
  const [users, setUsers] = useState([]);
  const [usersAux, setUsersAux] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = startIndex + PageSize;
  const currentUser = usersAux.slice(startIndex, endIndex);
  const totalPages = Math.ceil(usersAux.length / PageSize);
  const getUsers = async () => {
    clientAxios.get('/user').then((response) => {
      if (response.status !== 400) {
        setIsLoading(true);
        setUsers(response.data);
        setUsersAux(response.data);
      } else {
        Swal.fire({
          icon: 'error',
          iconColor: '#D44F80',
          title: 'Ha ocurrido un error!',
          color: '#FFF8D2',
          background: '#0A1326',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#D44F80',
        });
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, [flag]);

  const editUser = (id) => {
    alert(id);
  };

  const deleteUser = async (id, userName, role) => {
    const data = {
      id,
      userName,
      role,
    };
    Swal.fire({
      title: `Estas seguro que quieres eliminar el usuario ${userName}? Si su rol es artis se eliminara su usuario y sus galerias`,
      showDenyButton: true,
      color: '#FFF8D2',
      background: '#0A1326',
      confirmButtonColor: '#D44F80',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      denyButtonColor: '#D44F80',
    }).then((result) => {
      if (result.isConfirmed) {
        setFlag(!flag);
        clientAxios.delete('user', { data }).then((response) => {
          if (response.status !== 400) {
            setFlag(!flag);
            Swal.fire({
              icon: 'success',
              iconColor: '#D44F80',
              title: response.data.message,
              color: '#FFF8D2',
              background: '#0A1326',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#D44F80',
            });
          } else {
            Swal.fire({
              icon: 'error',
              iconColor: '#D44F80',
              title: response.data.message,
              color: '#FFF8D2',
              background: '#0A1326',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#D44F80',
            });
          }
        });
      }
    });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleFilterCat = (cat) => {
    if (cat === 'all') {
      setUsersAux(users);
    } else {
      const itemsMap = users.filter(
        (user) => user.role.toLowerCase() === cat.toLowerCase() && user,
      );
      setUsersAux(itemsMap);
    }
  };

  const handleFilterInput = (e) => {
    if (e.length === 0) {
      setUsersAux(users);
    } else {
      const itemsMap = users.filter(
        (user) => (user.userName.toLowerCase() === e.toLowerCase()
            || user.email.toLowerCase() === e.toLowerCase())
          && user,
      );

      setUsersAux(itemsMap);
    }
  };
  return (
    <div className="container my-5">
      <h1 className={`${styles.table}`}>Usuarios</h1>
      <div className="row">
        <div className="d-flex ps-0">
          <div className="me-2">
            <input
              type="text"
              className={`form-control ${styles.placeholder}`}
              onChange={(e) => handleFilterInput(e.target.value)}
              aria-label="Sizing example input"
              placeholder="Buscar por email o usuario"
            />
          </div>
          <div>
            <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${styles.categories}`}
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Filtrar por Roll
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilterCat('Admin')}
                    >
                      Administrador
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilterCat('artis')}
                    >
                      Artis
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilterCat('client')}
                    >
                      Cliente
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilterCat('all')}
                    >
                      Todos
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {!isLoading ? (
          <h1 className={`mt-2 ${styles.table}`}>
            Cargando <Spinner animation="grow" size="sm" />{' '}
            <Spinner animation="grow" size="sm" />
          </h1>
        ) : (
          <table className={` mt-2 table  ${styles.table}`}>
            <thead>
              <tr className={`${styles.categories}`}>
                <th scope="col">Nombre de usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Perfil</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.map((user, i) => (
                <tr key={i} className={`${styles.tableBody}`}>
                  <td>{user.userName}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {
                      <button
                        type="button"
                        onClick={() => deleteUser(user._id, user.userName, user.role)
                        }
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <nav className={'mt-3'}>
            <ul className={'pagination'}>
              <li className={`page-item  ${currentPage === 1 && 'disabled'} `}>
                <button
                  className={` page-link ${styles.categories}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={'page-item '}>
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

export default UserViewer;
