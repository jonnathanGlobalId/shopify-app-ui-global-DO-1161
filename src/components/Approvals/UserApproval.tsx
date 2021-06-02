import {useState} from 'react';
import HideContent from './HideContent';
import {appState} from '../../redux/reducer';
import {useSelector, useDispatch} from 'react-redux';
import {changeStatusOrderAction} from '../../redux/actions/orders/changeStatusOrderAction';
import {useMutation} from '@apollo/react-hooks';
import {ACCEPT_DRAFT_ORDER, REJECT_DRAFT_ORDER} from '../../graphql/Mutations';
interface PropsUserData {
  order?: Order
};

const UserApproval: React.FC<PropsUserData> = (props) => {
  const {shopUrl} = useSelector((state: appState) => state.user)
  const dispatch = useDispatch();

  const { id, customer, purchaseDate, status } = props.order;
  const { name, verified, birthday, issueDate, expirationDate } = customer
  const [showContent, setShowContent] = useState(false);
  const idData = id.split('/');
  const idNumber = idData[4];
  const [approveOrder] = useMutation(ACCEPT_DRAFT_ORDER, {onError: (data) => console.log('hubo un error', data)});
  const [rejectOrder] = useMutation(REJECT_DRAFT_ORDER, {onError: (data) => console.log('hubo un error', data)});

  const changeStatusOrder = (status: string) => {
    // dispatch(changeStatusOrderAction(status, id));
    if (status === 'REJECTED') {
      rejectOrder({
        variables: {
          input: {
            id: `gid://shopify/DraftOrder/${id + "hbisjdbcj"}`,
          }
        }
      })
      return;
    };
    if (status === 'APPROVED') {
      approveOrder({
        variables: {
          id: `gid://shopify/DraftOrder/${id + "lhbsdljsblj"}`,
        }
      })
    }
  }

  return (
    <>
      <div className="px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl text-gray-500 font-bold">{name}</h1>
            <h4>{verified}</h4>
          </div>
          <div
              onClick={() => setShowContent(!showContent)}
              className="cursor-pointer h-10 w-10 justify-center items-center">
            <i className={`fas fa-chevron-${showContent ? 'up' : 'down'} text-2xl`} />
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
              <a target="blank" href={`${shopUrl}/admin/orders/${idNumber}`} className="underline text-3xl text-blue-500 cursor-pointer">{idNumber}</a>
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
            <button
              onClick={() => changeStatusOrder('REJECTED')}
              disabled={status === 'REJECTED' ? true : false}
              className={`px-16 py-4 rounded-full text-2xl mr-10 focus:outline-none font-medium ${status === 'REJECTED' ? 'w-1/2 bg-gray-100 cursor-not-allowed text-gray-400' : status === 'APPROVED' ? 'hidden' : status === 'PENDING' && 'bg-gray-300'}`}
            >
              {status === 'REJECTED' && <i className="fas fa-check text-gray-400 mr-4" />}
              {status === 'REJECTED' ? 'Purchase rejected' : 'Reject' }
            </button>
            <button
              onClick={() => changeStatusOrder('APPROVED')}
              disabled={status === 'APPROVED' ? true : false}
              className={`px-16 py-4 rounded-full text-2xl mr-10 focus:outline-none font-medium text-white ${status === 'APPROVED' ? 'w-1/2 bg-blue-300 cursor-not-allowed' : status === 'REJECTED' ? 'hidden' : status === 'PENDING' && 'bg-blue-600'}`}
            >
              {status === 'APPROVED' && <i className="fas fa-check text-white mr-4" />}
              {status === 'APPROVED' ? 'Purchase approved' : 'Approve' }
            </button>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mb-10" />
    </>
  )
}

export default UserApproval
