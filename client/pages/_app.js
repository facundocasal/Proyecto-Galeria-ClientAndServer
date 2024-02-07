'use client';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

import { parseCookies, setCookie } from 'nookies';
import { useEffect, useState } from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import Script from 'next/script';
import BlockCaptures from '../components/Commons/blockCaptures';
import Error from '../components/Error';
import { GoogleAnalytics } from '../config/gtag';
import Loader from '../components/Loader/LoaderInit';
import Msginitial from '../components/MsgInitial/Msginitial';
import Navbar from '../components/Navbar/Navbar';
import { ShuffleProvider } from '../context/shuffleContext';
import { UserProvider } from '../context/userContext';
import { fb } from '../config/fb';
import { getGeolocalization } from '../ipState/ipState';

const MyApp = ({ Component, pageProps }) => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(true);
  const [err, setErr] = useState(false);

  const solApiGeolocation = (coords) => {
    getGeolocalization(coords.latitude, coords.longitude).then((res) => {
      setLocation(res.data?.ubicacion?.provincia?.nombre);
      setStatus(false);
    });
  };

  useEffect(() => {
    if (location !== null) {
      const encryptedProvince = location;
      setCookie(null, 'province', encryptedProvince, {
        maxAge: 5 * 24 * 60 * 60, // 30 días en segundos
        path: '/',
      });
    }
  }, [location]);

  const succesGetGeo = (position) => {
    const { coords } = position;
    solApiGeolocation(coords);
    setStatus(true);
  };

  const error = (er) => {
    console.log('error');
    setStatus(false);
    setErr(true);
  };

  useEffect(() => {
    const { province } = parseCookies();
    if (!province) {
      navigator.geolocation.getCurrentPosition(succesGetGeo, error);
    } else {
      setLocation(province);
      setStatus(false);
    }
  }, []);

  useEffect(() => {
    // Inicializa el pixel de Facebook
    fb.init('1026241412111745');
  }, []);

  if (err === true) {
    return (
      <Error
        texto={
          'Lo sentimos por privacidad de las artiss para  acceder necesitas activar tu ubicacion'
        }
      />
    );
  }

  return (
    <>
      {status ? (
        <Loader />
      ) : (
        <BlockCaptures>
          <ShuffleProvider>
            <UserProvider>
              <Msginitial />
              <GoogleAnalytics />
              <Head>
                <title>Proyecto Galeria</title>
                <meta
                  name="description"
                  content="Proyecto Galeria"
                />
              </Head>
              <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"
              />
              <Script
                src="https://widget.cloudinary.com/v2.0/global/all.js"
                type="text/javascript"
              ></Script>
              <Navbar />
              <Component {...pageProps} />
            </UserProvider>
          </ShuffleProvider>
        </BlockCaptures>
      )}
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
