import { useEffect, useState } from 'react';

import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import CardGallery from '../../components/CardGallery/CardGallery';
import Error from '../../components/Error';
import Footer from '../../components/Footer/Footer';
import LoaderInit from '../../components/Loader/LoaderInit';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Galleries.module.css';
import { useShuffle } from '../../context/shuffleContext';

const Galleries = () => {
  const [galerias, setGalerias] = useState(null);
  const [error, setError] = useState(false);
  const [erroNotGalleries, setErrorNotGalleries] = useState(null);
  const token = localStorage.getItem('accessToken') || undefined;
  const role = token === undefined ? 'client' : jwtDecode(token).role;
  const { shuffleArray } = useShuffle();
  const { province } = parseCookies();

  useEffect(() => {
    if (role === 'admin') {
      clientAxios('galleries/admin')
        .then((res) => {
          setGalerias(res.data);
        })
        .catch((res) => {
          setError(true);
        });
    } else {
      clientAxios(`galleries/${province}`)
        .then((res) => {
          if (res.data[0].message) {
            setGalerias([]);
            setErrorNotGalleries(res.data[0].message);
          }
          setGalerias(res.data);
        })
        .catch((err) => setError(true));
    }
  }, [parseCookies]);

  if (galerias === null) return <LoaderInit />;
  if (error) {
    return (
      <Error
        texto={'Ha ocurrido un error intentalo nuevamente en unos minutos'}
      />
    );
  }
  shuffleArray(galerias);
  return (
    <div className={styles.bgHome}>
      <Head>
        <title>Galerias - Proyecto Galeria</title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>

      <header>
        <ModalSingIn idModal="singIn" />
        <h5
          className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}
        >
          Galerias
        </h5>
      </header>

      <main className="mb-5 container-fluid">
        <section className="row gx-0">
          {erroNotGalleries ? (
            <div className="d-flex justify-content-center text-white">
              <h2>{erroNotGalleries}</h2>
            </div>
          ) : (
            galerias?.map((info, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3l">
                <CardGallery role={role} galeria={info} gallery />
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galleries;
