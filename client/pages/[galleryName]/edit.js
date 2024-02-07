import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { set } from 'react-hook-form';
import { useRouter } from 'next/router';
import Error from '../../components/Error';
import Footer from '../../components/Footer/Footer';
import ModalEditGallery from '../../components/ModalEditGallery/ModalEditGallery';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Galleries.module.css';

const Edit = () => {
  const { query } = useRouter();
  const nameGallery = query.galleryName;
  const [galerias, setGalerias] = useState();
  const jwt = localStorage.getItem('accessToken');
  const role = jwt ? jwtDecode(jwt).role : undefined;
  const router = useRouter();

  const getGalery = async () => {
    const response = await clientAxios('galleries/admin');
    setGalerias(
      response?.data?.find((gallery) => gallery.galleryName === nameGallery),
    );
  };
  useEffect(() => {
    getGalery();
  }, []);

  return (
    <>
      {role === 'admin' ? (
        <div className={styles.bgHome}>
          <Head>
            <title>Proyecto Galeria</title>
            <meta name="description" content="Proyecto Galeria" />
          </Head>

          <header>
            <ModalSingIn idModal="singIn" />
            <h5
              className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}
            >
              EDITAR GALERIA
            </h5>
          </header>

          <main>
            <ModalEditGallery galeria={galerias} />
          </main>
          <Footer />
        </div>
      ) : (
        <>
          <Error texto={'This page could not be found.'} number={'404'}></Error>
          {setTimeout(() => router.push('/'), 5000)}
        </>
      )}
    </>
  );
};

export default Edit;
