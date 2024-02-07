import React from 'react';
import ModalSingIn from './ModalSingIn';

const Component = {
  title: 'ModalSingIn',
  component: ModalSingIn,
};

const Template = () => (
  <>
  <button data-bs-toggle="modal" data-bs-target="#singIn">Sing IN</button>
    <ModalSingIn />
  </>
);

export const Default = Template.bind({});
export default Component;
