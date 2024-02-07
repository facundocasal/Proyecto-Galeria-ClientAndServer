import React from 'react';
import CardHome from './CardHome';
import cardHomeInfo from './cardHomeData.example.json';

const Component = {
  title: 'Card Home',
  component: CardHome,
};

const Template = () => (
  <div className='row gx-0'>
    <div className='col-12 col-md-4 col-lg-3'>
      <CardHome {...cardHomeInfo} />
    </div>
  </div>
);

export const Default = Template.bind({});
export default Component;
