import {useState} from 'react';
import HideContent from './HideContent';
import {appState} from '../../redux/reducer';
import {useSelector, useDispatch} from 'react-redux';
import {changeStatusOrderAction} from '../../redux/actions/orders/changeStatusOrderAction';
import moment from 'moment';
import { initialState } from '../../redux/reducer/user/userReducer';
import ReactLoading from 'react-loading';

interface PropsUserData {
  order?: Order
  position: Number
};

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

const UserApproval: React.FC<PropsUserData> = ({position, order}) => {
  const userState: initialState = useSelector((state:appState) => state.user);
  const dispatch = useDispatch();
  const { order_id, customer, status } = order;
  const { name, verification_status, date_of_birth, issue_date, expiration_date, purchase_date } = customer
  const [showContent, setShowContent] = useState(false);
  const [element, setElement] = useState<boolean>(false);

  const changeStatusOrder = async (status: Status) => {
    const element: Order[] = userState.pending_orders.filter((order: Order) => order.order_id === order_id);
    // console.log('Mismo elemento', element[0].order_id, order_id, element[0].order_id === order_id);
    setElement(element[0].order_id === order_id);

    if (status === Status.REJECTED) {
      console.log('Cancelando la orden', userState.location);
      dispatch(changeStatusOrderAction(Status.REJECTED, order_id));
    };
    if (status === Status.APPROVED) {
      dispatch(changeStatusOrderAction(Status.APPROVED, order_id));
    }
  }

  return (
    <>
      <div className="px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl text-gray-500 font-bold">{name}</h1>
            <h4>{verification_status}</h4>
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
              <h5 className="text-3xl">{moment(date_of_birth).format("DD/MM/YYYY")}</h5>
            </div>
            <div>
              <h3 className="text-4xl text-gray-500 font-bold mb-8">Purchase ID</h3>
              <a 
                target="blank" 
                href={`https://${userState?.user?.shop}.myshopify.com/admin/orders/${order_id}`} 
                className="underline text-3xl text-blue-500 cursor-pointer"
              >{ order_id}</a>
            </div>
          </div>
        {/* Contenido oculto */}
        <div className={`transition-all flex transform origin-top ${showContent ? 'scale-y-100' : 'scale-y-0 h-0'}`}>
          <HideContent
            issueDate={issue_date}
            expirationDate={expiration_date}
            purchaseDate ={purchase_date}
          />
        </div>
        {/* Contenido oculto */}
          <div className="flex mb-10">
            <button
              onClick={() => changeStatusOrder(Status.REJECTED)}
              disabled={status === 'REJECTED' ? true : false}
              className={`px-16 py-4 rounded-full text-2xl mr-10 focus:outline-none font-medium ${status === 'REJECTED' ? 'w-1/2 bg-gray-100 cursor-not-allowed text-gray-400' : status === 'APPROVED' ? 'hidden' : status === 'PENDING' && 'bg-gray-300'}`}
            >
              {userState.loading && element ? null : status === 'REJECTED' && <i className="fas fa-times text-gray-400 mr-4" />}
              {userState.loading && element ? <i className="fas fa-circle-notch fa-spin" /> : status === 'REJECTED'? 'Purchase rejected' : 'Reject' }
            </button>
            <button
              onClick={() => changeStatusOrder(Status.APPROVED)}
              disabled={status === 'APPROVED' ? true : false}
              className={`px-16 py-4 rounded-full text-2xl mr-10 focus:outline-none font-medium text-white ${status === 'APPROVED' ? 'w-1/2 bg-blue-300 cursor-not-allowed' : status === 'REJECTED' ? 'hidden' : status === 'PENDING' && 'bg-blue-600'}`}
            >
              {userState.loading && element ? null : status === 'APPROVED' && <i className="fas fa-check text-white mr-4" />}
              {userState.loading && element ? <i className="fas fa-circle-notch fa-spin" /> : status === 'APPROVED' ? 'Purchase approved' : 'Approve'}
            </button>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mb-10" />
    </>
  )
}

export default UserApproval
