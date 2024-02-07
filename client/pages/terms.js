import Footer from "../components/Footer/Footer";
import Head from "next/head";
import ModalSingIn from "../components/ModalSingIn/ModalSingIn";
import styles from "../styles/Terms.module.css";

const Terms = () => {
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
          TÉRMINOS Y CONDICIONES
        </h5>
      </header>

      <main className="mb-5 container-fluid">
        <section>
          {/* DATA TERMS */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
