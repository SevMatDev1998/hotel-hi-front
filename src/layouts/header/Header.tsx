import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import LanguageSwitcher from '../../components/LanguageSwitcher';
// import { logOut } from '../store/slices/auth.slice';
// import { useGetUnreadNotificationsCountQuery } from '../../services/notifications/notifications';
// import NotificationsModal from '../../modals/NotificationsModal';
// import RouteEnum from '../../enums/route.enum';
import useAppDispatch from '../../hooks/useAppDisaptch';
import { toggleSidebar } from '../../store/slices/general.slice';
import useAppSelector from '../../hooks/useAppSelector';
import { logOut } from '../../store/slices/auth.slice';
import SignOutModal from '../../modals/SignOutModal';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const open = useModal();

  const { isSidebarOpen } = useAppSelector(state => state.general)


  const handleSubmit = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleLogOut = () => {
    open(SignOutModal, { title: "", onSubmit: () => handleSubmit() });
  };

  return (
    <header className="">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button
            onClick={() => { handleLogOut() }}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <LogOut className="h-6 w-6" />
          </button>
          <button
            onClick={() => { dispatch(toggleSidebar(!isSidebarOpen)) }}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 hidden  mobile:block"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
