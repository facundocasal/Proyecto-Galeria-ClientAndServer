import React from 'react';
import Carousel from './Carousel';
import carouselInfo from './carouselData.example.json';
import carouselInfoMobile from './carouselDataMobile.example.json';

const Component = {
  title: 'Carousel',
  component: Carousel,
};

const Template = () => (
  <Carousel carouselInfo={carouselInfo} carouselInfoMobile={carouselInfoMobile} />
);

export const Default = Template.bind({});
export default Component;
