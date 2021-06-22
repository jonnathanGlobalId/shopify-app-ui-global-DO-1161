import {useEffect, useState} from 'react';
import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, HeaderTitle, SaveChanges, Loader} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfoAction} from '../redux/actions/user/userActions';
import {getOrdersAction} from '../redux/actions/orders/getOrdersActions';
import {appState} from '../redux/reducer';
import {CREATE_SCRIPT_TAG} from '../graphql/Mutations';
import {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_DRAFT_ORDERS, QUERY_ORDERS, QUERY_LOCATION} from '../graphql/Querys';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_LOCATION, GET_URL_SHOP} from '../redux/types';

const Index = () => {
  const [ownerId, setOwnerId] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [shop, setShop] = useState<string>('');

  const dispatch = useDispatch();
  const userState = useSelector((state: appState) => state.user);
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const resScriptag = useQuery(QUERY_SCRIPTTAGS);
  const resShopId = useQuery(QUERY_SHOPID);
  const orders = useQuery(QUERY_ORDERS);
  const draftOrdersQuery = useQuery(QUERY_DRAFT_ORDERS);
  const locationQuery = useQuery(QUERY_LOCATION);

  useEffect(() => {
    const ordersData: OrderShopify[] = orders.data?.orders?.edges
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
      dispatch(getOrdersAction(ownerId, ordersData));
    }
  }, [ownerId, draftOrdersQuery.data, orders.data]);

  useEffect(() => {
    if (locationQuery.data !== undefined) {
      const location: string = locationQuery.data?.locations?.edges[0]?.node?.id;
      const locationId = location.split('/')[4];
      console.log('Ubicación del usuario', location.split('/')[4]);
      dispatch({
        type: GET_LOCATION,
        payload: locationId,
      });
    }
  }, [locationQuery.data]);

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
