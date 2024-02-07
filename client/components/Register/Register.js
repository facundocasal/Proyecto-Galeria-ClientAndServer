import React, { useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import styles from './register.module.css';

const Register = () => {
  const [isValid, setIsValid] = useState(true);
  const [validEmail, setValidEmail] = useState({});
  const [validUserName, setValidUserName] = useState({});
  const [Loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    if (data.password !== data.confirmPassword) {
      setIsValid(false);
      setLoader(false);
      return;
    }
    const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}user`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        role: 'client',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const json = await resp.json();
    if (json.email) {
      setLoader(false);
      setValidEmail(json.email);
      return;
    }
    if (json.userName) {
      setLoader(false);
      setValidUserName(json.userName);
      return;
    }
    if (json.status === 200) {
      setLoader(false);
      window.location.replace('/login');
    }
    setLoader(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className={`input-group-text ${styles.icon}`}>
            <i className="bi bi-at"></i>
          </span>
          <input
            type="email"
            className={`form-control ${styles.placeholder}`}
            placeholder="Email *"
            aria-label="Email"
            {...register('email', { required: true })}
          />
        </div>
        {errors.email && (
          <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>
        )}
        {validEmail.status === 401 && (
          <p className={`mb-3 ${styles.text}`}>{validEmail.message}</p>
        )}
        <div className="input-group mb-3">
          <span className={`input-group-text ${styles.icon}`}>
            <i className="bi bi-emoji-smile"></i>
          </span>
          <input
            type="text"
            className={`form-control ${styles.placeholder}`}
            placeholder="Nombre de Usuario *"
            aria-label="userName"
            {...register('userName', {
              required: '* Este campo es requerido',
              minLength: {
                value: 4,
                message:
                  '* El nombre de usuario de contener entre 4 y 10 caracteres',
              },
              maxLength: {
                value: 10,
                message:
                  '* El nombre de usuario de contener entre 4 y 10 caracteres',
              },
            })}
          />
        </div>
        {errors.userName && (
          <p className={`mb-3 ${styles.text}`}>{errors.userName.message}</p>
        )}
        {validUserName.status === 401 && (
          <p className={`mb-3 ${styles.text}`}>{validUserName.message}</p>
        )}
        <div className="d-block d-md-flex">
          <div className="input-group mb-3 me-1">
            <span className={`input-group-text ${styles.icon}`}>
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className={`form-control ${styles.placeholder}`}
              placeholder="Nombre *"
              aria-label="Name"
              {...register('name', {
                required: '* El campo Nombre es requerido',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: '* En el campo Nombre solo se permiten letras',
                },
              })}
            />
          </div>
          <div className="input-group mb-3 ms-1">
            <span className={`input-group-text ${styles.icon}`}>
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className={`form-control ${styles.placeholder}`}
              placeholder="Apellido *"
              aria-label="Lastname"
              {...register('lastName', {
                required: '* El campo Apellido es requerido',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: '* En el campo Apellido solo se permiten letras',
                },
              })}
            />
          </div>
        </div>
        {errors.name && (
          <p className={`mb-3 ${styles.text}`}>{errors.name.message}</p>
        )}
        {errors.lastName && (
          <p className={`mb-3 ${styles.text}`}>{errors.lastName.message}</p>
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
            {...register('password', {
              required: '* Este campo es requerido',
              minLength: {
                value: 8,
                message: '* La contraseña debe contener al menos 8 caracteres',
              },
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message: 'Debe contener una mayuscula y un numero',
              },
            })}
          />
        </div>
        {errors.password && (
          <p className={`mb-3 ${styles.text}`}>{errors.password.message}</p>
        )}
        <div className="input-group mb-3">
          <span className={`input-group-text ${styles.icon}`}>
            <i className="bi bi-key"></i>
          </span>
          <input
            type="password"
            className={`form-control ${styles.placeholder}`}
            placeholder="Confirmar contraseña *"
            aria-label="confirmPassword"
            {...register('confirmPassword')}
          />
        </div>
        {isValid === false && (
          <p className={`mb-3 ${styles.text}`}>Las contraseñas no coinciden</p>
        )}
        <div className="mb-3 form-check">
          <input
            className={`form-check-input ${styles.checkBox}`}
            type="checkbox"
          />
          <label
            className={`form-check-label ${styles.check}`}
            htmlFor="flexCheckChecked"
          >
            Acepto los Términos y Políticas de Privacidad
          </label>
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-100 ${styles.button}`}
        >
          REGISTRARME {Loader ? <Spinner animation="grow" size="sm" /> : ''}
        </button>
      </form>
    </>
  );
};

export default Register;
