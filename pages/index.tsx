import MainLayout from '../Layout/MainLayout';
import {ConditionsGlobalId, ConnectGlobalId, HeaderTitle} from '../components';

const Index = () => (
  <MainLayout>
    <div className="flex-row">
      <div className="w-7/12">
        <HeaderTitle title="Settings" subtitle="Reduce risk and eliminate fraud with free customer ID verification" />
        <ConnectGlobalId />
        <ConditionsGlobalId />
      </div>
    </div>
  </MainLayout>
);

export default Index;
