import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";

import CardGallery from "../CardGallery/CardGallery";
import CardHome from "../CardHome/CardHome";
import { Navigation } from "swiper";
import PropTypes from "prop-types";

/* eslint-disable import/no-unresolved */

const CardCarousel = ({ carouselInfo, gallery, artis }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: artis || gallery,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      style={{ marginBottom: "40px" }}
    >
      {carouselInfo.map((info, index) => (
        <SwiperSlide key={index}>
          {gallery && <CardGallery index galeria={info} />}
          {artis && <CardHome {...info} seccion="home" />}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

CardCarousel.propTypes = {
  carouselInfo: PropTypes.array.isRequired,
  gallery: PropTypes.number,
  artis: PropTypes.number,
};

export default CardCarousel;
