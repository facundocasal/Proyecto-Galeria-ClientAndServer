import { useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import AlertSecurity from '../../components/Alert/AlertSecurity';
import Footer from '../../components/Footer/Footer';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import LoaderInit from '../../components/Loader/LoaderInit';
import ModalImage from '../../components/ModalImage/ModalImage';
import ModalPay from '../../components/ModalPay/ModalPay';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Galleries.module.css';

const Gallery = () => {
  const [gallery, setGallery] = useState('');
  const router = useRouter();
  const galleryName = router.query.id;
  const token = localStorage.getItem('accessToken');
  const user = token ? jwtDecode(token) : false;
  const [idUser, setIdUser] = useState(user ? user.userId : 0);
  const [img, setImg] = useState('');
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(true);
  const handleClose = () => setShow(false);

  const handleShow = (src) => {
    setImg(src);
    setShow(true);
  };
  const handleAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    clientAxios(`purchase/user/${idUser}/${galleryName}`)
      .then((res) => {
        setGallery(res.data);
      })
      .catch((err) => Swal.fire('Intente nuevamente mas tarde'));
  }, [galleryName]);

  if (!gallery) return <LoaderInit />;
  return (
    <div className={styles.bgHome}>
      <Head>
        <title>
          {gallery?.galleryName} - {gallery?.idArtis} -
        </title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>

      <header>
        <ModalSingIn idModal="singIn" />
        <ModalSingIn idModal="singInBuy" isLogin />
        <div className="pt-5 pb-4">
          <h6
            className={`text-uppercase fw-bolder text-center ${styles.title}`}
          >
            {gallery?.galleryName}
          </h6>
          <h6 className={`fw-bolder text-center mb-4 ${styles.subTitle}`}>
            Galería de fotos de {gallery?.idArtis}
          </h6>
        </div>
      </header>

      <main className="mb-5 container-fluid">
        <section className="row gx-0 ">
          <AlertSecurity alert={alert} handleAcept={handleAlert} />
          {gallery?.photos ? (
            gallery?.photos?.map((src, i) => (
              <div
                key={i}
                className="mb-3  col-md-3 position-relative d-flex justify-content-center "
              >
                <img
                  className=" d-none d-md-block"
                  src={src}
                  alt={src}
                  onClick={() => handleShow(src)}
                  style={{
                    cursor: 'pointer',
                    width: ' 90%',
                    objectFit: 'contain',
                  }}
                />
                <img
                  className=" d-block d-md-none"
                  src={src}
                  alt={src}
                  onClick={() => handleShow(src)}
                  style={{
                    width: ' 90%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))
          ) : (
            <>
              {gallery?.photosShow?.map((src, i) => (
                <div
                  key={i}
                  className="mb-3 col-md-3 position-relative d-flex justify-content-center"
                >
                  <img
                    className=" d-none d-md-block"
                    src={src}
                    onClick={() => handleShow(src)}
                    alt={src}
                    style={{
                      cursor: 'pointer',
                      width: '90%',
                      objectFit: 'cover',
                    }}
                  />
                  <img
                    className=" d-block d-md-none"
                    src={src}
                    alt={src}
                    style={{ width: '90%', objectFit: 'cover' }}
                  />
                </div>
              ))}
              <div
                key={259}
                className="mb-3 col-md-3  position-relative d-flex justify-content-center"
              >
                <img
                  src={gallery?.photoBlur}
                  alt={gallery?.photoBlur}
                  style={{ width: '90%', objectFit: 'cover' }}
                />
                <div
                  className={`position-absolute top-50 start-50 translate-middle text-center ${styles.textColor} `}
                >
                  <h4
                    className={`fw-bold text-uppercase mb-4 ${styles.contentTitle}`}
                  >
                    Contenido restringido
                  </h4>
                  {!token ? (
                    <>
                      <p>
                        Si querés suscribirte o si ya tenes una suscripción a
                        esta galería, inicia sesión para poder suscribirte o
                        visualizarla.{' '}
                      </p>
                      <p>
                        <em>
                          Precio final de la galería AR${gallery?.price} - US${' '}
                          {gallery?.price_USD}
                        </em>
                      </p>
                      <div className="my-4">
                        <button
                          className={`btn ${styles.outlineButton} btn-outline-dark`}
                          data-bs-toggle="modal"
                          data-bs-target="#singInBuy"
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        Para ver las {gallery.numberPhotos} fotos sin censura,
                        <br />
                        hacé click en el botón de abajo
                      </p>
                      <div className="my-4">
                        <button
                          className={`px-5 btn ${styles.button}`}
                          data-bs-toggle="modal"
                          data-bs-target="#modalPay"
                        >
                          Suscríbete
                        </button>
                      </div>

                      <p>
                        <em>
                          Precio final de la galería AR${gallery?.price} - US${' '}
                          {gallery?.price_USD}
                        </em>
                      </p>
                    </>
                  )}
                </div>
                <GeneralModal id="modalPay" name="Como quieres abonar ?">
                  <ModalPay
                    artis={gallery.idArtis}
                    price_USD={gallery?.price_USD}
                    price={gallery?.price}
                    item={gallery.galleryName}
                    galleryName={gallery.galleryName}
                  />
                </GeneralModal>
              </div>
            </>
          )}
        </section>
      </main>
      <ModalImage show={show} handleClose={handleClose} src={img} />
      <Footer />
    </div>
  );
};

export default Gallery;
