import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, ConnectGlobalId, HeaderTitle, ShopInfo} from '../components';

const Index = () => (
  <MainLayout>
    <HeaderTitle title="Settings" subtitle="Reduce risk and eliminate fraud with free customer ID verification" />
    <div>
      <div className="w-6/12">
        <ConnectGlobalId />
      </div>
      <div className="border-gray-200 border" />
      <div className="w-6/12">
        <ShopInfo />
      </div>
      <div className="border-gray-200 border" />
      <div className="w-7/12">
        <ConditionsGlobalId />
      </div>
    </div>
  </MainLayout>
);

export default Index;
