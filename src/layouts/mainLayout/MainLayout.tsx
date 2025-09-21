import { FC, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { getJwtToken } from '../../utils/tokenUtil';
import useAppSelector from '../../hooks/useAppSelector';

// import { useGetInfoQuery } from '../../../services/auth/auth.service';
import RouteEnum from '../../enums/route.enum';
import PRIVATE_ROUTES from '../../constants/private-routes';
import PUBLIC_ROUTES from '../../constants/publict-routes';
import MainLayoutComponents from './MainLayoutComponents';

export const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const jwtToken = getJwtToken();

  // const { isLoading } = useGetInfoQuery(undefined, {
  //   skip: !jwtToken
  // });

  const { isLogin } = useAppSelector((state: any) => state.auth);


  useEffect(() => {
    // if (isLoading) return;
    if (false) return;

    const isPrivate = PRIVATE_ROUTES.includes(pathname as RouteEnum);
    const isPublic = PUBLIC_ROUTES.includes(pathname as RouteEnum);

    if (!isLogin && isPrivate) {
      navigate(RouteEnum.LOGIN);
    }

    if (isLogin && isPublic) {
      navigate(RouteEnum.HOME);
    }

  // }, [navigate, pathname, isLogin, isLoading]);
  }, [navigate, pathname, isLogin]);

  return <MainLayoutComponents/>
};


