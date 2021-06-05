import React from 'react'

interface Loader {
  show: boolean
};

const Loader: React.FC<Loader> = ({show}) => {
  
  return (
    <>
      {show && <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-700 z-50 bg-opacity-50 flex w-screen h-full items-center justify-center">
        <h2 className="text-7xl text-white font-bold">LOADING...</h2>
      </div>}
    </>
  )
}

export default Loader
