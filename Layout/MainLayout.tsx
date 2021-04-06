import React from 'react';
import {HeaderTabs} from '../components';

const MainLayout: React.FC = ({children}) => {
  return (
    <>
      <HeaderTabs />
      <div className="max-w-screen-lg m-auto bg-white pt-10 pl-20 rounded-lg mt-16">
        {children}
      </div>
    </>
  )
}

export default MainLayout
