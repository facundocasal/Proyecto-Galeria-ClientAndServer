import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import ModalSingIn from "../ModalSingIn/ModalSingIn";
import clientAxios from "../../config/clientAxios";
import jwtDecode from "jwt-decode";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";

const Navbar = () => {
  const router = useRouter();
  const { userData, flagReload, setFlagReload } = useUser();
  const [role, setRole] = useState("");

  const logout = () => {
    localStorage.clear();
    setFlagReload(!flagReload);
    router.push("/");
    window.location.reload();
  };

  useEffect(() => {
    const tok = localStorage.getItem("accessToken");
    if (tok !== null) {
      setRole(jwtDecode(tok).role);
      clientAxios("jwt")
        .then((res) => "")
        .catch((err) => {
          logout();
        });
    }
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.bgNav}`}>
        <div
          className={`container-fluid d-flex justify-content-between ${styles.containerNav}`}
        >
          <Link href="/" passHref>
            <Image
              className={styles.linkImage}
              width={147.6}
              height={61}
              src="/images/logo.png"
              alt="logo"
              quality={100}
            />
          </Link>
          <button
            className={`navbar-toggler ${styles.buttonCollapse}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className={`fs-1 bi bi-justify ${styles.buttonCollIcon}`}></i>
          </button>
          <div
            className={`collapse navbar-collapse flex-grow-0 ${styles.collapseMenu}`}
            id="navbarCollapse"
          >
            <ul
              className={`navbar-nav d-flex ${styles.navCollapse} mb-2 mb-lg-0 text-end`}
            >
              <li className={`nav-item ${styles.navItem}`}>
                <Link href="/galleries" passHref>
                  <a className={`nav-link ${styles.colorLink} px-0 px-lg-3`}>
                    Galerías
                  </a>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link href="/artis" passHref>
                  <span className={`nav-link ${styles.colorLink} px-0 px-lg-3`}>
                    Artiss
                  </span>
                </Link>
              </li>
              {role === "admin" && (
                <li className={`nav-item ${styles.navItem}`}>
                  <Link href="/admin" passHref>
                    <span
                      className={`nav-link ${styles.colorLink} px-0 px-lg-3`}
                    >
                      Admin
                    </span>
                  </Link>
                </li>
              )}
              <li className={`nav-item ${styles.navItem}`}>
                {userData.accessToken && (
                  <Link href="/user" passHref>
                    <span
                      className={`nav-link ${styles.colorLink} px-0 px-lg-3`}
                    >
                      Hola , {userData.userName}{" "}
                      <i className="bi bi-person-fill"></i>
                    </span>
                  </Link>
                )}
              </li>
              <li className={`nav-item btn-group ${styles.navItem}`}>
                {userData.accessToken ? (
                  <div className="btn-group">
                    <button
                      className={`nav-link dropdown-toggle ${styles.buttonDropdown} px-5 px-lg-3`}
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul
                      className={`dropdown-menu ${styles.dropdown}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="nav-link" href="/user" passHref>
                          <span className={`${styles.colorLink} m-3`}>
                            Mi cuenta
                          </span>
                        </Link>
                      </li>
                      <li>
                        <span
                          className={`${styles.colorLink} m-3`}
                          aria-current="page"
                          onClick={logout}
                        >
                          Cerrar sesión
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <a
                    className={`d-flex align-items-center fs-5 ${styles.colorLink}`}
                    aria-current="page"
                    data-bs-toggle="modal"
                    data-bs-target="#singIn"
                  >
                    <button
                      type="button"
                      className={`nav-link ${styles.buttonStyleGet} px-4 px-lg-3 mb-3 mb-lg-0 me-0 me-lg-3`}
                    >
                      Ingresar
                    </button>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ModalSingIn isRegister idModal="register" activeRegister={2} />
    </>
  );
};

export default Navbar;
