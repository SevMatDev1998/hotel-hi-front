import  { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import appToast from '../../helpers/appToast';
import { useTranslation } from '../../hooks/useTranslation';
import { useVerifyRegistrationQuery } from '../../services/auth';
import RouteEnum from '../../enums/route.enum';

const VerifyContainer = () => {

  const [searchParams] = useSearchParams(); // хук от React Router
  const token = searchParams.get('token');  // достаём значение ?token=...
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isSuccess, isLoading, error } = useVerifyRegistrationQuery({ token: token || '' }, { skip: !token });

  useEffect(() => {
    if (isSuccess) {
      navigate(RouteEnum.LOGIN);
      appToast('success', t('api_success.EMAIL_CONFIRMED'), { duration: 4000 });
    }
     
    if (error) {
      appToast('error', t('api_error.REGISTRATION_FAILED'), { duration: 4000 });
      navigate(RouteEnum.LOGIN);
    }
  }, [data, isLoading, error]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      VerifyContainer
    </div>
  );
};

export default VerifyContainer;