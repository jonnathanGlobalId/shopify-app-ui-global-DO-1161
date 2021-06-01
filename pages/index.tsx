import {useEffect, useState} from 'react';
import MainLayout from '../Layout/MainLayout';
import {Dispatch} from 'redux';
import {ConditionsGlobalId, HeaderTitle, SaveChanges} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {getUSerInfoAction} from '../redux/actions/user/userActions';
import {appState} from '../redux/reducer';
import {CREATE_SCRIPT_TAG} from '../graphql/Mutations';
import {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_DRAFT_ORDERS} from '../graphql/Querys';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {createHmac} from 'crypto';
import moment from 'moment';
import {GETURL_SHOP} from '../redux/types';
import {ITGetOrders} from '../redux//@types/settingsActionTypes';
import { DummyData } from '../utils/dummyData';

const Index = () => {  
  const [ownerId, setOwnerId] = useState<string>('');
  const [shopNAme, setShopName] = useState<string>('');

  const dispatch = useDispatch();
  const ordersDispatch: Dispatch<ITGetOrders> = useDispatch();
  const userState = useSelector((state: appState) => state.user);
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const resScriptag = useQuery(QUERY_SCRIPTTAGS);
  const resShopId = useQuery(QUERY_SHOPID); 
  const resDraftOrders = useQuery(QUERY_DRAFT_ORDERS);
  console.log('Respuesta de las drafOrders', resDraftOrders?.data?.draftOrders?.edges);
  console.log('Errores de las drafOrders', resDraftOrders?.error);

  useEffect(() => {
    console.log('Vamos a obtener los datos del usuario desde el api');
    dispatch(getUSerInfoAction());
  }, []);

  useEffect(() => {
    if(resShopId?.data !== undefined) {
      const userId = resShopId.data?.shop;
      const userIdArray: string = userId?.id.split('/');
      const id: string = userIdArray[4];
      setOwnerId(id);
      setShopName(userId?.name);
      dispatch({
        type: GETURL_SHOP,
        payload: userId?.url
      })
      ordersDispatch({
        type: 'GET_ORDERS',
        payload: DummyData,
      })
    }
  }, [resShopId?.data]);

  useEffect(() => {
    if(resScriptag?.data !== undefined && resScriptag?.data.scriptTags.edges.length <= 0) {
      console.log('Vamos a crear un script tag');
      createScripts({
        variables: {
          input: {
            src: `https://shopify-fake-api.herokuapp.com/script?shop=${shopNAme}&id=${ownerId}`,
            displayScope: "ALL",
          },
        },
        refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
      });
    }
  }, [resScriptag?.data]);

  useEffect(() => {
    if(resScriptag?.data !== undefined && resScriptag?.data.scriptTags.edges.length > 0 && resShopId?.data !== undefined) {
      const secret = process.env.NEXT_PUBLIC_SECRET;
      const epoch = (moment().unix()).toString();
      const hmac = createHmac('sha256', `${ownerId}-${secret}`).update(epoch);
      console.log('Información del hmac', hmac.digest('hex'));
    } 
  }, [resScriptag?.data, resShopId?.data]); 


  return (
    <>
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
