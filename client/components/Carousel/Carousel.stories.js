import React from 'react';
import Carousel from './Carousel';

const Component = {
  title: 'Carousel',
  component: Carousel,
};

const Template = () => (
  <Carousel carouselInfo={carouselInfo} carouselInfoMobile={carouselInfoMobile} />
);

export const Default = Template.bind({});
export default Component;
