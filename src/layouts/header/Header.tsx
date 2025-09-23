import { Bell, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import LanguageSwitcher from '../../components/LanguageSwitcher';
// import { logOut } from '../store/slices/auth.slice';
// import { useGetUnreadNotificationsCountQuery } from '../../services/notifications/notifications';
// import NotificationsModal from '../../modals/NotificationsModal';
// import RouteEnum from '../../enums/route.enum';
import { FC } from 'react';
import useAppDispatch from '../../hooks/useAppDisaptch';


interface IHeader {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export const Header: FC<IHeader> = ({ setIsShowSideBar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const open = useModal();
  // const { data } = useGetUnreadNotificationsCountQuery();
  // const unreadCount = data?.count || 0;

  // const handleSubmit = () => {
  //   dispatch(logOut());
  //   navigate("/login");
  // };

  const handleLogOut = () => {
    // open(SignOutModal, { title: "", onSubmit: () => handleSubmit() });
  };

  return (
    <header className="">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="/icons/logo.svg"
            alt="Logo"
            className="h-10 w-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button
            className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            onClick={() => {
              // open(NotificationsModal, {
              //   title: "", onSubmit: (id: string) => {
              //     navigate(`${RouteEnum.NOTIFICATIONS}/${id}`)

              //   }
              // });
            }}
          >
            <Bell className="h-6 w-6" />
            {/* {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{unreadCount}</span>
            )} */}
          </button>
          <button
            onClick={() => { handleLogOut() }}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <LogOut className="h-6 w-6" />
          </button>
          <button
            onClick={() => { setIsShowSideBar((prev) => !prev) }}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 hidden  mobile:block"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
