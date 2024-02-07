import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useState } from 'react';
import clientAxios from '../../config/clientAxios';
import styles from './cardgallery.module.css';

const CardGallery = ({
  gallery, index = false, role, galeria,
}) => {
  const {
    _id,
    coverPhotoGallery,
    galleryName,
    price,
    price_USD,
    numberPhotos,
  } = galeria;
  const router = useRouter();

  const handleClick = () => {
    if (!index) return;
    router.push(`/gallery/${galleryName}`);
  };
  const handleGoToGallery = () => {
    router.push(`/gallery/${galleryName}`);
  };
  const deleteGallery = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h2>Estas seguro de borrar la galeria ${galleryName}??</h2>`,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((res) => {
      if (res.isConfirmed) {
        clientAxios.delete(`galleries/delete/${_id}`).then((resp) => {
          Swal.fire({
            icon: 'success',
            html: `<h2> ${galleryName} borrada con exito</h2>`,
          });
          window.location.reload();
        });
      }
    });
  };
  const handleGaleria = () => {
    router.push(`/${galleryName}/edit`);
  };

  return (
    <div className="m-1 position-relative ">
      <div className={styles.cardGallery}>
        <div className="position-relative" onClick={handleGoToGallery}>
          <img
            className={styles.cardImg}
            src={coverPhotoGallery}
            alt={
              galleryName
            }
          />
          <div className="text-white px-2 py-1 bg-dark bg-opacity-75 position-absolute bottom-0 end-0 d-flex">
            <i className="bi bi-camera me-1" />
            <div className={styles.imageQuantity}>{numberPhotos}</div>
          </div>
        </div>
        <div className={`p-2 ${styles.cardBody}`}>
          {gallery && (
            <>
              <div className="d-flex justify-content-between align-items-center px-lg-4">
                <p className={`fw-normal ${styles.titleName}`}>{galleryName}</p>
                <p className={`fw-light text-end ${styles.priceGallery}`}>
                  ${price} | {price_USD} USD
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center ps-lg-4">
                <button
                  onClick={handleGoToGallery}
                  className={`btn ${styles.button}`}
                >
                  Suscribete
                </button>
                {role === 'admin' && (
                  <div>
                    <button
                      onClick={() => deleteGallery()}
                      className={`btn btn-primary m-1  ${styles.btnAdmin} `}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <button
                      onClick={handleGaleria}
                      className={`btn btn-primary m-1  ${styles.btnAdmin}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGallery;
