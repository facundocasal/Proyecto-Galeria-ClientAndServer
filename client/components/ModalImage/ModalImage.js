import { Modal, ModalBody } from 'react-bootstrap';
import React, { useState } from 'react';

import styles from './modalImage.module.css';

const ModalImage = ({ show, handleClose, src }) => {
  return (

    <Modal show={show} onHide={handleClose}>
      <ModalBody
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#050914',
        }}
      >
          <i
            onClick={handleClose}
            className=
            {`bi bi-x-circle-fill  ${styles.icon} `}
          ></i>
          <img src={src} style={{ height: '100%' }} />

      </ModalBody>
    </Modal>
  );
};

export default ModalImage;
