import UserViewer from './UserViewer';

const Component = {
  title: 'UserViewer',
  component: UserViewer,
};

const Template = () => (
  <div className='bg-dark'>
    <UserViewer />
  </div>
);

export const Default = Template.bind({});
export default Component;
