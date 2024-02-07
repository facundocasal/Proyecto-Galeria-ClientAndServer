import React from 'react';
import Footer from './Footer';

const Component = {
  title: 'Footer',
  component: Footer,
};

const Template = () => (
  <div style={{ background: '#050914' }}>
    <Footer />
  </div>
);

export const Default = Template.bind({});
export default Component;
