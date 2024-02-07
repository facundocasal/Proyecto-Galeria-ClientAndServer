import React, { useEffect, useState } from "react";

import Error from "../../components/Error";
import Footer from "../../components/Footer/Footer";
import Head from "next/head";
import ModalEditArtis from "../../components/ModalEditArtis/ModalEditArtis";
import ModalSingIn from "../../components/ModalSingIn/ModalSingIn";
import clientAxios from "../../config/clientAxios";
import jwtDecode from "jwt-decode";
import styles from "../../styles/Galleries.module.css";
import { useRouter } from "next/router";

const EditArtis = () => {
  const { query } = useRouter();
  const { idArtis } = query;
  const [artis, setArtis] = useState();
  const jwt = localStorage.getItem("accessToken");
  const role = jwt ? jwtDecode(jwt).role : undefined;
  const router = useRouter();
  useEffect(() => {
    clientAxios("artis/admin").then((res) => {
      setArtis(res?.data?.find((q) => q.name === idArtis));
    });
  }, [idArtis]);

  return (
    <>
      {role === "admin" ? (
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
              EDITAR a {idArtis}
            </h5>
          </header>
          <main>
            <ModalEditArtis artis={artis} />
          </main>
          <Footer />
        </div>
      ) : (
        <>
          <Error texto={"This page could not be found."} number={"404"}></Error>
          {setTimeout(() => router.push("/"), 5000)}
        </>
      )}
    </>
  );
};

export default EditArtis;
