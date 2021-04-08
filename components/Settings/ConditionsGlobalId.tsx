import {useState} from 'react';
import Switch from 'react-ios-switch';

interface IContitionAuth {
  address: boolean;
  ammount: boolean;
}

const ConditionsGlobalId = () => {
  const [conditionAuth, setConditionAuth] = useState<IContitionAuth>({
    address: false,
    ammount: false
  });

  return (
    <div className="pb-10 pl-20">
      <div className="flex justify-between my-10 items-center">
        <h4 className="text-2xl w-11/12 pr-10"
          >Require ID verification for orders when <b>Billing Address</b> does not match <b>Shipping Address?</b>
        </h4>
        <Switch
          onChange={() => setConditionAuth({...conditionAuth, address: !conditionAuth.address})}
          checked={conditionAuth.address}
          onColor="#0D51FF"
        />
      </div>
      <div className="flex justify-between my-10 items-center">
        <h4 className="text-2xl"
          >Require ID verification for orders above $ 
            <span className="border-2 border-blue-500 text-blue-500 px-5 py-2 rounded-lg ml-3 font-semibold"
              >100</span>
        </h4>
        <Switch
          onChange={() => setConditionAuth({...conditionAuth, ammount: !conditionAuth.ammount})}
          checked={conditionAuth.ammount}
          onColor="#0D51FF"
        />
      </div>
    </div>
  )
}

export default ConditionsGlobalId
