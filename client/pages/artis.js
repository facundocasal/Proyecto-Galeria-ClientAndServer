import { useEffect, useState } from 'react';

import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import CardHome from '../components/CardHome/CardHome';
import Error from '../components/Error';
import Footer from '../components/Footer/Footer';
import LoaderInit from '../components/Loader/LoaderInit';
import ModalSingIn from '../components/ModalSingIn/ModalSingIn';
import clientAxios from '../config/clientAxios';
import styles from '../styles/Galleries.module.css';
import { useShuffle } from '../context/shuffleContext';

const Artiss = () => {
  const token = localStorage.getItem('accessToken') || undefined;
  const role = token === undefined ? 'client' : jwtDecode(token).role;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { shuffleArray } = useShuffle();

  useEffect(() => {
    const { province } = parseCookies();
    const desencryptedProvince = province;
    if (desencryptedProvince) {
      if (role === 'admin') {
        clientAxios.get('artis/admin').then((response) => {
          setData(response.data);
          setLoading(false);
        });
      } else {
        clientAxios.get(`artis/${desencryptedProvince}`).then((res) => {
          if (res.data[0].message) {
            setError(res.data[0].message);
          }
          setData(res.data);
          setLoading(false);
        });
      }
    }
  }, []);

  shuffleArray(data);
  if (loading) return <LoaderInit />;
  return (
    <div>
      <div className={styles.bgHome}>
        <Head>
          <title>Artiss - Proyecto Galeria</title>
          <meta name="description" content="Proyecto Galeria" />
        </Head>

        <header>
          <ModalSingIn idModal="singIn" />
          <h5
            className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}
          >
            Artiss
          </h5>
        </header>

        <main className="mb-5 container-fluid">
          <section className="row gx-0">
            {error !== null ? (
              <div className="d-flex justify-content-center w-100 text-white ">
                <h1>{error}</h1>
              </div>
            ) : (
              data.map((info, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-4">
                  <CardHome {...info} />
                </div>
              ))
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Artiss;
