import Error from "../../components/Error";
import Head from "next/head";
import ModalSingIn from "../../components/ModalSingIn/ModalSingIn";
import { Nav } from "react-bootstrap";
import NewArtis from "../../components/NewArtis/NewArtis";
import NewGallery from "../../components/NewGallery/NewGallery";
import SalesTable from "../../components/SalesTable/SalesTable";
import UserViewer from "../../components/UsersViewer/UserViewer";
import jwtDecode from "jwt-decode";
import styles from "../../styles/Galleries.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const Admin = () => {
  const [artis, setArtis] = useState(false);
  const [activeTab, setActiveTab] = useState("newArtis");

  const jwt = localStorage.getItem("accessToken");
  const role = jwt ? jwtDecode(jwt).role : undefined;
  const router = useRouter();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {role === "admin" ? (
        <div className={`min-vh-100 ${styles.bgHome} `}>
          <Head>
            <title>Proyecto Galeria </title>
            <meta name="description" content="Proyecto Galeria " />
          </Head>

          <header>
            <ModalSingIn idModal="singIn" />
          </header>

          <main
            className={` p-md-5 ${styles.bgHome} d-flex justify-content-center flex-wrap`}
          >
            <div className="container">
              <div className="row  mx-auto col-8 border-bottom d-flex justify-content-center ">
                <div className={`${styles.textColor}`}>
                  <Nav fill variant="pills" activeKey={activeTab}>
                    <Nav.Item className="my-1 mx-1">
                      <Nav.Link
                        className={`${styles.button} ${styles.outlineButton} text-decoration-none rounded`}
                        eventKey="newArtis"
                        onClick={() => handleTabChange("newArtis")}
                        style={{
                          backgroundColor:
                            activeTab === "newArtis" && "#D44F80",
                        }}
                      >
                        Nueva Artis
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="my-1 mx-1">
                      <Nav.Link
                        className={`${styles.button} ${styles.outlineButton} text-decoration-none rounded`}
                        eventKey="newGallery"
                        onClick={() => handleTabChange("newGallery")}
                        style={{
                          backgroundColor:
                            activeTab === "newGallery" && "#D44F80",
                        }}
                      >
                        Nueva Galería
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="my-1 mx-1">
                      <Nav.Link
                        className={`${styles.button} ${styles.outlineButton} text-decoration-none rounded`}
                        eventKey="userViewer"
                        onClick={() => handleTabChange("userViewer")}
                        style={{
                          backgroundColor:
                            activeTab === "userViewer" && "#D44F80",
                        }}
                      >
                        Visor de Usuario
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="my-1 mx-1">
                      <Nav.Link
                        className={`${styles.button} ${styles.outlineButton} text-decoration-none rounded`}
                        eventKey="salesTable"
                        onClick={() => handleTabChange("salesTable")}
                        style={{
                          backgroundColor:
                            activeTab === "salesTable" && "#D44F80",
                        }}
                      >
                        Tabla de Ventas
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
              {activeTab === "newArtis" && <NewArtis setArtis={setArtis} />}
              {activeTab === "newGallery" && <NewGallery artisSelect={artis} />}
              {activeTab === "userViewer" && <UserViewer />}
              {activeTab === "salesTable" && <SalesTable />}
            </div>
          </main>
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
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();

  return {
    props: { data },
  };
}
export default Admin;
