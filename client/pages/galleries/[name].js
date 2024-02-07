import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import CardGallery from "../../components/CardGallery/CardGallery";
import Footer from "../../components/Footer/Footer";
import GeneralModal from "../../components/GeneralModal/GeneralModal";
import Head from "next/head";
import ModalPay from "../../components/ModalPay/ModalPay";
import ModalSingIn from "../../components/ModalSingIn/ModalSingIn";
import clientAxios from "../../config/clientAxios";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
import styles from "../../styles/Galleries.module.css";

const Galleries = () => {
  const route = useRouter();
  const [data, setData] = useState();
  const [errorLocation, setErrorLocation] = useState(null);
  const token = localStorage.getItem("accessToken");
  const user = token ? jwtDecode(token) : false;

  useEffect(() => {
    const { province } = parseCookies();
    const desencryptedProvince = province;
    if (desencryptedProvince) {
      clientAxios(
        `/galleries/artis/${route.query.name}/${desencryptedProvince}`
      )
        .then((res) => {
          setErrorLocation(null);
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
          setErrorLocation(error?.response?.data?.message);
        });
    }
  }, [route]);

  return (
    <div className={styles.bgHome}>
      <Head>
        <title>
          Galerias de {data ? data[0].idArtis : undefined} - Proyecto Galeria 
        </title>
        <meta name="description" content="Proyecto Galeria" />
      </Head>
      <header>
        <ModalSingIn idModal="singIn" />
        <h5
          className={`text-uppercase fw-bolder text-center py-3 ${styles.title}`}
        >
          Galerias
        </h5>
        <div className="alert-container">
          {data?.length && user && (
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalSub"
              className={`${styles.button} mb-2 rounded `}
              role="alert"
            >
              Suscríbete a todas las galerias de {Router.query.name} haciendo
              click aqui
            </button>
          )}
        </div>
      </header>

      <main className="mb-5 container-fluid">
        <section className="row gx-0">
          {errorLocation && (
            <h2 className="text-center text-white">{errorLocation}</h2>
          )}
          {data?.length === 0 ? (
            <h2 className="text-center text-white">
              <span style={{ color: "#D44F80", textTransform: "capitalize" }}>
                {Router.query.name}
              </span>{" "}
              NO TIENE GALERIAS DISPONIBLES
            </h2>
          ) : (
            data?.map((info, index) => (
              <>
                <div key={index} className="col-6 col-md-4 col-lg-3">
                  <CardGallery galeria={info} gallery />
                </div>
              </>
            ))
          )}
        </section>

        {data && (
          <GeneralModal id="modalSub" name="¿ Como quieres abonar ?">
            <ModalPay
              artis={data[0]?.idArtis}
              price={data?.reduce((acc, cur) => acc + cur.price, 0)}
              price_USD={data?.reduce((acc, cur) => acc + cur.price_USD, 0)}
              type="sub"
            />
          </GeneralModal>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Galleries;
