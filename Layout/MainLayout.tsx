import React from 'react';
import {Header} from '../components';

const MainLayout: React.FC = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout
