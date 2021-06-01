import {useEffect, useState} from 'react';
import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, HeaderTitle, SaveChanges} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {getUSerInfoAction} from '../redux/actions/user/userActions';
import {appState} from '../redux/reducer';
import {CREATE_SCRIPT_TAG} from '../graphql/Mutations';
import {QUERY_SCRIPTTAGS, QUERY_SHOPID} from '../graphql/Querys';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {createHmac} from 'crypto';
import moment from 'moment';
import {GET_URL_SHOP} from '../redux/types';

const Index = () => {
  const [ownerId, setOwnerId] = useState<string>('');
  const [shopNAme, setShopName] = useState<string>('');

  const dispatch = useDispatch();
  const userState = useSelector((state: appState) => state.user);
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const resScriptag = useQuery(QUERY_SCRIPTTAGS);
  const resShopId = useQuery(QUERY_SHOPID);

  useEffect(() => {
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
