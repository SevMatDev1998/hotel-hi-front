import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import appToast from "../../helpers/appToast";
import RouteEnum from "../../enums/route.enum";

export const loginEffect = (isSuccess:boolean, isError:boolean, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    appToast('success', t('auth.messages.login_success'), { duration: 4000 });
    navigate(RouteEnum.HOTEL);
  }

  if (isError) {
    appToast('error', t('auth.messages.login_error'), { duration: 4000 });
  }
}

export const signUpEffect = (isSuccess:boolean, isError:boolean, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    appToast('success', t('auth.messages.register_success'), { duration: 4000 });
    navigate(RouteEnum.HOTEL);
  }

  if (isError) {
    appToast('error', t('auth.messages.register_error'), { duration: 4000 });
  }
}