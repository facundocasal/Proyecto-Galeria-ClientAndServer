import React from 'react';
import CardGallery from './CardGallery';
import cardHomeInfo from './cardGalleryData.example.json';

const Component = {
  title: 'Card Gallery',
  component: CardGallery,
};

const Template = () => (
  <div className='row gx-0'>
    <div className='col-12 col-md-4 col-lg-3'>
      <CardGallery {...cardHomeInfo} />
    </div>
    <div className='col-12 col-md-4 col-lg-3'>
      <CardGallery {...cardHomeInfo} gallery />
    </div>
  </div>
);

export const Default = Template.bind({});
export default Component;
