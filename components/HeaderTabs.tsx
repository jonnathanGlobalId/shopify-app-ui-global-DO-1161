
import Link from 'next/link';
import {useRouter} from 'next/router';

const HeaderTabs = () => {

  const {pathname} = useRouter();

  //Tabla verdad para las rutas
  const Home = pathname === '/';
  const Approvals = pathname === '/approvals';
  const History = pathname === '/history';

  return (
    <div className="h-24">
      <ul className="flex h-full items-center relative w-1/3 justify-between transition-all">
        <div className={`bg-blue-600 absolute bottom-0 left-0 h-1 w-1/3 transition-all ${Home ? 'left-0' : Approvals ? 'left-1/3' : History ? 'left-2/3' : 'left-0'}`} />
        <li className={`h-full flex w-1/3 ${Home ? 'text-blue-600' : 'text-black'}`}>
          <Link href="/">
            <p className="h-full justify-center cursor-pointer items-center w-full flex font-medium text-2xl">
              Settings
            </p>
          </Link>
        </li>
        <li className={`h-full flex w-1/3 ${Approvals ? 'text-blue-600' : 'text-black'}`}>
          <Link href="/approvals">
            <p  className="h-full text-center justify-center cursor-pointer items-center w-full flex font-medium text-2xl">
              Pendding approvals
            </p>
          </Link>
        </li>
        <li className={`h-full flex w-1/3 ${History ? 'text-blue-600' : 'text-black'}`}>
          <Link href="/history">
            <p  className="h-full justify-center cursor-pointer items-center w-full flex font-medium text-2xl">
              History
            </p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderTabs
