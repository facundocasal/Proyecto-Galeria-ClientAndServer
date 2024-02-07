import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "../../styles/Forms.module.css";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row flex-lg-row flex-column-reverse justify-content-center">
          <div className="col-lg-6 col-md-12 col-12 mt-3 align-items-center d-flex justify-content-center">
            <div className="w-75">
              <Link href="/" passHref>
                <a>
                  <Image
                    src="Logo.jpg"
                    alt="Proyecto Galeria"
                    height={2250}
                    width={4000}
                    quality={100}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <h4 className={`pt-4 pt-md-3 text-center ${styles.title}`}>
              Términos y condiciones
            </h4>
            <div className="row">
              <Link href="/about" passHref>
                <a
                  className={`text-decoration-none text-center p-2 ${styles.condition}`}
                  href="#"
                >
                  Sobre Nosotros
                </a>
              </Link>
              <Link href="/politics" passHref>
                <a
                  className={`text-decoration-none text-center p-2 ${styles.condition}`}
                  href="#"
                >
                  Políticas de privacidad
                </a>
              </Link>
              <Link href="/terms" passHref>
                <a
                  className={`text-decoration-none text-center p-2 ${styles.condition}`}
                  href="#"
                >
                  Términos y condiciones
                </a>
              </Link>
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 py-3">
            <p className={`m-0 text-center ${styles.title}`}>
              Proyecto Galeria - Todos los derechos reservados © 2023
            </p>
          </div>
          <div className="col-lg-6 col-md-12 py-3">
            <p className={`m-0 text-center ${styles.title}`}>
              Sitio web realizado por
              <a
                href="https://www.linkedin.com/in/fabricio-alberto-597b17220/"
                className={`text-decoration-none ${styles.condition}`}
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Fabricio Alberto{" "}
              </a>
              y
              <a
                href="https://www.linkedin.com/in/facundo-nahuel-casal"
                className={`text-decoration-none ${styles.condition}`}
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Facundo Casal
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
