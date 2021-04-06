import {HeaderTabs} from "../components"

const ApprovalLayout: React.FC = ({children}) => {
  return (
    <>
      <HeaderTabs />
      <div className="max-w-screen-sm m-auto bg-white mt-16 rounded-2xl">
        {children}
      </div>
      <div className="h-10" />
    </>
  )
}

export default ApprovalLayout
