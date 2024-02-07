import PropTypes from "prop-types";
import styles from "./carousel.module.css";
import { useRouter } from "next/router";

const Carousel = ({ carouselInfo }) => {
  const { push } = useRouter();

  const goArtis = (name) => {
    push(`/galleries/${name}`);
  };
  const goArtiss = () => {
    push("/artis");
  };

  return (
    <>
      <div
        id="carouselIndicators"
        className="carousel slide  d-md-block"
        data-bs-ride="carousel"
      >

        <div className="carousel-inner">
          {carouselInfo.map((info, index) => (
            <div
              className={` ${styles.container_gral} carousel-item ${
                index === 0 ? "active" : undefined
              }`}
              key={index}
            >
              <div
                className={`${styles.container1} h-100 position-absolute d-flex justify-content-center align-items-center text-uppercase`}
              >
                <div
                  className={`${styles.container2} h-100  d-flex flex-column justify-content-center align-items-md-start  align-items-lg-start align-items-center `}
                >
                  <h3 className={styles.title}>{info?.name}</h3>
                  <div className="mt-4">
                    <button
                      className={styles.btn_banner2}
                      onClick={() => goArtis(info?.name)}
                    >
                      {" "}
                      Ver artis
                    </button>
                    <button className={styles.btn_banner} onClick={goArtiss}>
                      {" "}
                      Mas artis
                    </button>
                  </div>
                </div>
              </div>
              <img
                src={
                   info?.photoCarrusel
                }
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                 alt={
                  info?.name
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Carousel.propTypes = {
  carouselInfo: PropTypes.array.isRequired,
  carouselInfoMobile: PropTypes.array.isRequired,
};

export default Carousel;
