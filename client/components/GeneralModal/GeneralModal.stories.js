import React from 'react';
import GeneralModal from './GeneralModal';

const Component = {
  title: 'General Modal',
  component: GeneralModal,
};

const Template = () => (
  <>
    <button type="button" className="btn btn-primary m-4" data-bs-toggle="modal" data-bs-target='#exampleModal'>
      Launch demo modal
    </button >

    <GeneralModal id='exampleModal'>
      <h3>FAQ</h3>

      {/* preguntas frecuentes  */}
    </GeneralModal>
  </>
);

export const Default = Template.bind({});
export default Component;
