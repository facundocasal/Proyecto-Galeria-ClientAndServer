import React from 'react';
import CardCarousel from './CardCarousel';

export default {
  title: 'Card Carousel',
  component: CardCarousel,
};

const Template = (args) => <CardCarousel {...args} />;

export const GalleryCard = {
  args: {
    gallery: 4,
  },
};

export const ArtisCard = {
  args: {
    artis: 5,
  },
};
