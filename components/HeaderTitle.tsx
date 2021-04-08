
interface propsHeaderTitle {
  title: string;
  subtitle: string;
}

const HeaderTitle: React.FC<propsHeaderTitle> = ({title, subtitle}) => {
  return (
    <div className="mb-10">
      <div className="pt-16 pl-20">
        <h1 className="font-semibold text-5xl mb-3 text-gray-500">{title}</h1>
        <h5 className="text-gray-400 text-3xl mb-10">{subtitle}</h5>
      </div>
      <div className="border border-gray-200 w-full" />
    </div>
  )
}

export default HeaderTitle
