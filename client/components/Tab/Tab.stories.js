import Tab from './Tab';

const Component = {
  title: 'Tab',
  component: Tab,
};

const Template = () => (
  <div className='bg-dark'>
    <Tab />
  </div>
);

export const Default = Template.bind({});
export default Component;
