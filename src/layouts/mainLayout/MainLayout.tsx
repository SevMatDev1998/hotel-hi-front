import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getJwtToken } from '../../utils/tokenUtil';
import useAppSelector from '../../hooks/useAppSelector';

// import { useGetInfoQuery } from '../../../services/auth/auth.service';
import RouteEnum from '../../enums/route.enum';
import PRIVATE_ROUTES from '../../constants/private-routes';
import PUBLIC_ROUTES from '../../constants/publict-routes';
import MainLayoutComponents from './MainLayoutComponents';
import { useGetInfoQuery } from '../../services/auth';
import AuthLayout from '../auth/AuthLayout';

export const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const jwtToken = getJwtToken();


    const isPrivate = PRIVATE_ROUTES.includes(pathname as RouteEnum);
    const isPublic = PUBLIC_ROUTES.includes(pathname as RouteEnum);

  const { isLoading } = useGetInfoQuery(undefined, {
    skip: !jwtToken
  });


  const { isLogin } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (isLoading) return;

    console.log(333, isLogin, isPrivate);

    if (!isLogin && isPrivate) {
      navigate(RouteEnum.LOGIN);
    }

    if (isLogin && isPublic) {
      navigate(RouteEnum.HOTEL);
    }

  }, [navigate, pathname, isLogin, isLoading, isPrivate, isPublic]);


  return isPrivate ? <MainLayoutComponents /> : <AuthLayout><Outlet /></AuthLayout>;
};


