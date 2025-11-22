import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getJwtToken } from '../../utils/tokenUtil';
import useAppSelector from '../../hooks/useAppSelector';

import RouteEnum from '../../enums/route.enum';
import PRIVATE_ROUTES from '../../constants/private-routes';
import PUBLIC_ROUTES from '../../constants/publict-routes';
import GUEST_ROUTES from '../../constants/guest-routes';
import MainLayoutComponents from './MainLayoutComponents';
import { useGetInfoQuery } from '../../services/auth';
import AuthLayout from '../auth/AuthLayout';
import GuestLayout from '../guest/GuestLayout';

export const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const jwtToken = getJwtToken();
  
  const isPrivate = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  const isPublic = PUBLIC_ROUTES.includes(pathname as RouteEnum);
  const isGuest = GUEST_ROUTES.some(route => pathname.startsWith(route));

  const {isLoading, isFetching, isError } = useGetInfoQuery(undefined, {
    skip: !jwtToken,
  });

  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (!jwtToken && isPrivate) {
      navigate(RouteEnum.LOGIN);
      return;
    }

    if (isError && isPrivate) {
      navigate(RouteEnum.LOGIN);
      return;
    }

    if (isLogin && isPublic) {
      navigate(RouteEnum.HOTEL);
    }
  }, [navigate, pathname, isLogin, isLoading, isFetching, isError, isPrivate, isPublic, jwtToken]);

  if (isPrivate) return <MainLayoutComponents />;
  if (isGuest) return <GuestLayout />;
  return <AuthLayout><Outlet /></AuthLayout>;
};


