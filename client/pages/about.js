import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import ModalSingIn from '../components/ModalSingIn/ModalSingIn';
import styles from '../styles/About.module.css';

const About = () => {
  return (
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
          Sobre Nosotros
        </h5>
      </header>

      <main className="mb-5 container-fluid">
        <section>
          <p className={`m-4 px-3 ${styles.about}`}>Proyecto Galeria.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
