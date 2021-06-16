import {useEffect, useState} from 'react';
import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, HeaderTitle, SaveChanges, Loader} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfoAction} from '../redux/actions/user/userActions';
import {appState} from '../redux/reducer';
import {CREATE_SCRIPT_TAG} from '../graphql/Mutations';
import {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_DRAFT_ORDERS} from '../graphql/Querys';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {createHmac} from 'crypto';
import moment from 'moment';
import {GET_URL_SHOP} from '../redux/types';
import {ENCRYPTION_SECRET, GLOBAL_ID_API_URL} from '../conf'
import { getOrdersAction } from '../redux/actions/orders/getOrdersActions';

const Index = () => {
  const [ownerId, setOwnerId] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [shop, setShop] = useState<string>('');

  const dispatch = useDispatch();
  const userState = useSelector((state: appState) => state.user);
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const resScriptag = useQuery(QUERY_SCRIPTTAGS);
  const resShopId = useQuery(QUERY_SHOPID);
  const draftOrdersQuery = useQuery(QUERY_DRAFT_ORDERS);

  useEffect(() => {
    const draftOrders = draftOrdersQuery.data?.draftOrders?.edges;
    if (ownerId && shopName && shop && draftOrders !== undefined){
      const firstData: OwnerCondition = {
        name: shopName,
        owner_id: ownerId,
        shop,
        order_amount_limit_enabled: false,
        different_address_enabled: false,
        order_amount_limit: 0,
      }
      dispatch(getUserInfoAction(ownerId, firstData));
      dispatch(getOrdersAction(ownerId, draftOrders));
    }
  }, [ownerId, draftOrdersQuery.data]);

  useEffect(() => {
    if(resShopId?.data !== undefined) {
      const userId = resShopId.data?.shop;
      const userIdArray: string = userId?.id.split('/');
      const id: string = userIdArray[4];
      setOwnerId(id);
      setShopName(userId?.name);
      setShop(userId?.myshopifyDomain);
      dispatch({
        type: GET_URL_SHOP,
        payload: userId?.url
      })
    }
  }, [resShopId?.data]);

  useEffect(() => {
    if(resScriptag?.data !== undefined && resScriptag?.data.scriptTags.edges.length <= 0) {
      createScripts({
        variables: {
          input: {
            //src: `${GLOBAL_ID_API_URL}/script-tag`,
            src: 'https://shopify-fake-api.herokuapp.com/script',
            displayScope: "ALL",
          },
        },
        refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
      });
    }
  }, [resScriptag?.data]);

  useEffect(() => {
    if(resScriptag?.data !== undefined && resScriptag?.data.scriptTags.edges.length > 0 && resShopId?.data !== undefined) {
      const secret = ENCRYPTION_SECRET;
      const epoch = (moment().unix()).toString();
      const hmac = createHmac('sha256', `${ownerId}-${secret}`).update(epoch);
    }
  }, [resScriptag?.data, resShopId?.data]);


  return (
    <>
      <Loader show={draftOrdersQuery.loading} />
      <MainLayout>
        <HeaderTitle title="Settings" subtitle="Reduce risk and eliminate fraud with free customer ID verification" />
        <div>
          <div className=" md:w-11/12 sm:w-full lg:w-7/12">
            <ConditionsGlobalId />
          </div>
        </div>
      </MainLayout>
      {userState?.isChanged && <SaveChanges />}
    </>
  );
}
export default Index;
