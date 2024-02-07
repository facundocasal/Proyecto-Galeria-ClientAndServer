import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import ModalSingIn from '../components/ModalSingIn/ModalSingIn';
import styles from '../styles/Politics.module.css';

const Politics = () => {
  return (
    <div className={styles.bgHome}>
      <Head>
        <title>Proyecto Galeria - </title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>

      <header>
        <ModalSingIn idModal="singIn" />
        <h5
          className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}
        >
          Políticas de Privacidad
        </h5>
      </header>

      <main className="mb-5 container-fluid">
        <section>
          <p className={`m-4 px-3 ${styles.politics}`}>{data.pre}</p>
          <p className={`m-4 px-3 ${styles.politics}`}>{data.presentation}</p>
          {/* data politics  */}

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Politics;
