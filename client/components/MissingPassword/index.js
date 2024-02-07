import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './missing_ps.module.css';

const MissingPassword = ({ callback }) => {
  const [Loader, setLoader] = useState(false);

  const onSubmit = async (data) => {
    // Return to login
    callback();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <span className={`input-group-text ${styles.icon}`}>
          <i className="bi bi-at"></i>
        </span>
        <input
          type="email"
          className={`form-control ${styles.placeholder}`}
          placeholder="Email *"
          aria-label="Email"
        />
      </div>
      <button
        type="submit"
        className={`btn btn-primary w-100 ${styles.button}`}
      >
        {Loader ? (
          <Spinner animation="grow" size="sm" />
        ) : (
          'SOLICITAR CAMBIO DE CONTRASEÑA'
        )}
      </button>
    </form>
  );
};

export default MissingPassword;
