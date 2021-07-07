import React from 'react';
import {HeaderTabs} from '../components';

const MainLayout: React.FC = ({children}) => {
  return (
    <>
      <HeaderTabs />
      <div className="max-w-screen-lg bg-white rounded-2xl m-14">
        {children}
      </div>
      <div className="h-10" />
    </>
  )
}

export default MainLayout
