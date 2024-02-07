import React, { useState } from 'react';

import MissingPassword from '../MissingPassword/index';
import Spinner from 'react-bootstrap/Spinner';
import clientAxios from '../../config/clientAxios';
import styles from './login.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUser } from '../../context/userContext';

const Login = () => {
  const [error, setError] = useState();
  const [Loader, setLoader] = useState(false);
  const [updatePassword, SetUpdatePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { flagReload, setFlagReload } = useUser();

  const onSubmit = async (data) => {
    setLoader(true);
    clientAxios
      .post('login', { ...data })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('user_name', res.data.name);
        setLoader(false);
        if (router.pathname === '/login') {
          setFlagReload(!flagReload);
          router.push('/');
        } else {
          router.reload();
        }
      })
      .catch((err) => {
        setLoader(false);
        setError(err.response.data.message);
      });
  };

  const handleMissingPasswordForm = () => {
    SetUpdatePassword((prev) => !prev);
  };

  return (
    <>
      {updatePassword ? (
        <MissingPassword callback={handleMissingPasswordForm} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className={`input-group-text ${styles.icon}`}>
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className={`form-control ${styles.placeholder}`}
              placeholder="Nombre de usuario / Correo electrónico *"
              aria-label="Email"
              {...register('user', { required: true })}
            />
          </div>
          {errors.user && (
            <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>
          )}
          <div className="input-group mb-3">
            <span className={`input-group-text ${styles.icon}`}>
              <i className="bi bi-key"></i>
            </span>
            <input
              type="password"
              className={`form-control ${styles.placeholder}`}
              placeholder="Contraseña *"
              aria-label="Password"
              {...register('password', { required: true })}
            />
          </div>
          {errors.password && (
            <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>
          )}
          {error && (
            <p className={`${styles.text}`}>* Los datos son incorrectos</p>
          )}
          <div className="d-flex justify-content-between">
            <div className="mb-3 pt-2 form-check">
              <input
                className={`form-check-input ${styles.checkBox}`}
                type="checkbox"
              />
              <label
                className={`form-check-label ${styles.remember}`}
                htmlFor="flexCheckChecked"
              >
                Recuérdame
              </label>
            </div>
          </div>
          <button type="submit" className={`btn w-100 ${styles.button}`}>
            ACCEDER {Loader ? <Spinner animation="grow" size="sm" /> : ''}
          </button>
        </form>
      )}
    </>
  );
};

export default Login;
