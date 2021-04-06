import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, ConnectGlobalId, HeaderTitle} from '../components';

const Index = () => (
  <MainLayout>
    <HeaderTitle title="Settings" subtitle="Reduce risk and eliminate fraud with free customer ID verification" />
    <div className="flex-row">
      <div className="w-6/12">
        <ConnectGlobalId />
      </div>
      <div className="w-7/12">
        <ConditionsGlobalId />
      </div>
    </div>
  </MainLayout>
);

export default Index;
