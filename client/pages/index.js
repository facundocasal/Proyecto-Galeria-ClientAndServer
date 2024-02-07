import { useEffect, useState } from 'react';

import Head from 'next/head';
import { parseCookies } from 'nookies';
import Carousel from '../components/Carousel/Carousel';
import Error from '../components/Error';
import Footer from '../components/Footer/Footer';
import InfoSection from '../components/InfoSection/InfoSection';
import InfoSubs from '../components/InfoSubs/InfoSubs';
import LoaderInit from '../components/Loader/LoaderInit';
import ModalSingIn from '../components/ModalSingIn/ModalSingIn';
import Tab from '../components/Tab/Tab';
import clientAxios from '../config/clientAxios';
import styles from '../styles/Home.module.css';
import { useShuffle } from '../context/shuffleContext';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [galleries, setGalleries] = useState(null);
  const [artiss, setArtiss] = useState(null);
  const [error, setError] = useState(false);
  const [errorNotArtiss, setErrorNotArtiss] = useState(null);
  const { shuffleArray } = useShuffle();
  const provinceCookie = parseCookies().province;

  useEffect(() => {
    clientAxios(`galleries/${provinceCookie}`)
      .then((res) => {
        if (res.data[0].message) {
          setGalleries([]);
        } else {
          setGalleries(res.data);
        }
      })
      .catch((err) => setError(true));
    clientAxios(`artis/${provinceCookie}`)
      .then((res) => {
        if (res.data[0].message) {
          setErrorNotArtiss(res.data[0].message);
          setArtiss([]);
        } else {
          setArtiss(res.data);
        }
      })
      .catch((err) => setError(true));
  }, [parseCookies]);

  const random = () => {
    const len = artiss?.length;
    return Math.floor(Math.random() * len);
  };

  useEffect(() => {
    if (artiss?.length === 0 || !artiss) return;
    setBanners([...banners, artiss[random()]]);
  }, [artiss]);

  if (!galleries || !artiss) return <LoaderInit />;

  if (error) {
    return (
      <Error
        texto={'Ha ocurrido un error intentalo nuevamente en unos minutos'}
      />
    );
  }
  shuffleArray(galleries);
  shuffleArray(artiss);
  return (
    <div className={styles.bgHome}>
      <Head>
        <title>Proyecto Galeria - </title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>

      <header>
        <ModalSingIn idModal="singIn" />
        <Carousel carouselInfo={banners} />
      </header>

      <main className="mb-5">
        {errorNotArtiss ? (
          <div className=" mt-5 p-5 d-flex justify-content-center align-items-center text-white bg-red">
            <h2>{errorNotArtiss}</h2>
          </div>
        ) : (
          <>
            <InfoSubs className="my-5" />
            <Tab galleries={galleries} artiss={artiss} />
            <InfoSection className="my-5" />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
