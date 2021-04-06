import React from 'react';
import {HeaderTabs} from '../components';

const MainLayout: React.FC = ({children}) => {
  return (
    <>
      <HeaderTabs />
      <div className="max-w-screen-lg m-auto bg-white rounded-2xl mt-16">
        {children}
      </div>
        <div className="h-10" />
    </>
  )
}

export default MainLayout
