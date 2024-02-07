import CardCarousel from "./CardCarousel";
import React from "react";
import carouselGalleryInfo from "./carouselGalleryData.example.json";
import carouselArtisInfo from "./carouselArtisData.example.json";

export default {
  title: "Card Carousel",
  component: CardCarousel,
};

const Template = (args) => <CardCarousel {...args} />;

export const GalleryCard = {
  args: {
    carouselInfo: carouselGalleryInfo,
    gallery: 4,
  },
};

export const ArtisCard = {
  args: {
    carouselInfo: carouselArtisInfo,
    artis: 5,
  },
};
