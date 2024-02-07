import Head from 'next/head';
import Login from '../components/Login/Login';
import styles from '../styles/Politics.module.css';

const LoginPage = () => {
  return (
    <div className={styles.bgHome}>
      <Head>
        <title>Login - MQC</title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>

      <main className="container">
        <section className="vh-100 w-100 row gx-0 justify-content-center">
          <div className="col-12 col-sm-10 col-lg-6 mt-5">
            <Login />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
