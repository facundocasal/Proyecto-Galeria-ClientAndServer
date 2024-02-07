import React, { useEffect, useState } from "react";

import EditAccount from "../../components/EditAccount/EditAccount";
import TableBuy from "../../components/TableBuy/TableBuy";
import TableSus from "../../components/TableSus/TableSus";
import clientAxios from "../../config/clientAxios";
import jwtDecode from "jwt-decode";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";

const User = () => {
  const [user, setUser] = useState(1);
  const router = useRouter();
  const [compras, setCompras] = useState([]);
  const token = localStorage.getItem("accessToken");
  const userToken = token ? jwtDecode(token) : false;
  const [idUser, setIdUser] = useState(userToken ? userToken.userId : "");
  const [provincesLocked, setProvincesLocked] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const infoUser = async () => {
    const response = await clientAxios.get(`user/${idUser}`);
    setUserInfo(response.data);
  };

  const getCompras = async () => {
    const response = await clientAxios.get(`purchase/${idUser}`);
    setCompras(response.data);
  };

  if (localStorage.getItem("accessToken") === null) {
    router.push("/");
  }
  const addIdProvinces = (provincesLockedArtiss) => {
    const data = provincesLockedArtiss.map((province) => {
      return {
        id: uuid(),
        name: province,
      };
    });
    return data;
  };
  useEffect(() => {
    infoUser();
    getCompras();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo?.userName) {
      clientAxios
        .get("artis/getProvincesArtis", { userName: userInfo.userName })
        .then((res) =>
          setProvincesLocked(addIdProvinces(res.data?.provinces || []))
        );
    }
  }, [userInfo]);

  return (
    <div className={styles.controlUser}>
      <div className="text-center py-5">
        <h5 className={styles.title}>Editar cuenta</h5>
        <span className={` text-normal ${styles.text} `}>
          Bienvenid@ {userInfo?.name}. En esta sección verás toda la información
          detallada de tú cuenta.
        </span>
      </div>
      <section className="row gx-0">
        <section className="d-flex col-12 col-md-4 col-lg-4">
          <div className="border-end">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="mt-3 d-flex align-items-center justify-content-between">
                <i className={`bi bi-person-circle ${styles.icoUser}`}></i>
              </div>
              <div className="w-100">
                <nav className="nav flex-column mt-5">
                  <div className={`nav-link ${styles.column}`}>
                    <span onClick={() => setUser(1)}>Editar cuenta</span>
                  </div>
                  {userInfo?.role === "client" ? (
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis pedidos</span>
                    </div>
                  ) : (
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis Ventas</span>
                    </div>
                  )}
                  {userInfo?.role === "client" && (
                    <div>
                      <div className={`nav-link ${styles.column}`}>
                        <span onClick={() => setUser(4)}>Suscripciones</span>
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="col-12 col-md-8 col-lg-7">
          {user === 1 && userInfo && (
            <EditAccount
              userInfo={userInfo}
              provincesLocked={provincesLocked}
            />
          )}
          {user === 2 && (
            <TableBuy
              role={userInfo?.role || ""}
              data={compras}
              key={userInfo.id}
            />
          )}
          {user === 4 && <TableSus data={compras} key={userInfo.id} />}
        </section>
      </section>
    </div>
  );
};

export default User;
