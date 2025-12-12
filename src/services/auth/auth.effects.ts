import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import appToast from "../../helpers/appToast";
import RouteEnum from "../../enums/route.enum";

export const loginEffect = (isSuccess:boolean, error:any, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    navigate(RouteEnum.HOTEL);
  }

  if (error) {
    appToast('error', t(`api_errors.${error.data.message}`), { duration: 4000 });
  }
}

export const signUpEffect = (isSuccess:boolean, error:any, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    appToast('success', t('api_success.REGISTRATION_SUCCESS'), { duration: 4000 });
    navigate(RouteEnum.LOGIN);
  }

  if (error) {
    appToast('error', t(`api_errors.${error.data.message}`), { duration: 4000 });
  }
}

export const resetPasswordEffect = (isSuccess:boolean, error:any, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {

  if (isSuccess) {
    appToast('success', t(`api_success.CONFIRMATION_EMAIL_SENT`), { duration: 4000 });
    navigate(RouteEnum.LOGIN);
  }

  if (error) {
    appToast('error', t(`api_errors.${error.data.message}`), { duration: 4000 });
  }
}