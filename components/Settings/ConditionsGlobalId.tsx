
const ConditionsGlobalId = () => {
  return (
    <div className="pb-5">
      <div className="flex justify-between my-10 items-center">
        <h4 className="text-2xl w-11/12"
          >Require ID verification for orders when <b>Billing Address</b> does not match <b>Shipping Address?</b>
        </h4>
        <input
          id="address"
          type="checkbox" />
      </div>
      <div className="flex justify-between my-10 items-center">
        <h4 className="text-2xl"
          >Require ID verification for orders above $ 
            <span className="border-2 border-blue-500 text-blue-500 px-5 py-2 rounded-lg ml-3 font-semibold"
              >100</span>
        </h4>
        <input
          id="ammount"
          type="checkbox" />
      </div>
    </div>
  )
}

export default ConditionsGlobalId
