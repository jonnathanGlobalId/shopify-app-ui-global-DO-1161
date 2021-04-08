import {useState} from 'react';
import HideContent from './HideContent';

interface PropsUserData {
  dummy?: DummyData
};

const UserApproval: React.FC<PropsUserData> = (props) => {
  const {name, verified, birthday, purchaseId, issueDate, expirationDate, purchaseDate} = props.dummy;
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <div className="px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl text-gray-500 font-bold">{name}</h1>
            <h4>{verified}</h4>
          </div>
          <div className="cursor-pointer">
            <h1 onClick={() => setShowContent(!showContent)}>{showContent ? 'Hide' : 'Show'}</h1>
          </div>
        </div>
        <div className={`transition-all transform origin-bottom ${showContent ? '' : ''}`}>
          <div className="flex justify-between mb-10">
            <div>
              <h3 className="text-4xl text-gray-500 font-bold mb-8">Date of birth</h3>
              <h5 className="text-3xl">{birthday}</h5>
            </div>
            <div>
              <h3 className="text-4xl text-gray-500 font-bold mb-8">Purchase ID</h3>
              <h5 className="underline text-3xl text-blue-500 cursor-pointer">{purchaseId}</h5>
            </div>
          </div>
        {/* Contenido oculto */}
        <div className={`transition-all flex transform origin-top ${showContent ? 'scale-y-100' : 'scale-y-0 h-0'}`}>
          <HideContent 
            issueDate={issueDate}
            expirationDate={expirationDate}
            purchaseDate ={purchaseDate }
          />
        </div>
        {/* Contenido oculto */}
          <div className="flex mb-10">
            <button className="px-16 py-4 rounded-full text-3xl mr-10 focus:outline-none font-medium bg-gray-300">Reject</button>
            <button className="px-16 py-4 rounded-full text-3xl mr-10 focus:outline-none font-medium bg-blue-600 text-white">Approve</button>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mb-10" />
    </>
  )
}

export default UserApproval
