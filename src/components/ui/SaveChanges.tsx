import React from 'react';
import {useDispatch} from 'react-redux';
import {saveChangeActions} from '../../redux/actions/save-changes/SaveChangeAction';

const SaveChanges = () => {
  const dispatch = useDispatch();

  const handleSaveState = () => {
    dispatch(saveChangeActions());
  }

  return (
    <>
      <div className="fixed bottom-0 bg-white w-full flex justify-between items-center px-10 py-6 z-50">
        <h1
          className="font-medium text-2xl"
        >Your configurations has been changed, do you want save it?</h1>
        <button
          onClick={handleSaveState}
          className="bg-blue-600 text-white px-10 py-4 rounded-md focus: outline-none"
        >Save</button>
      </div>
    </>
  )
}

export default SaveChanges
