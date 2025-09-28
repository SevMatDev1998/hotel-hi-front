import { NavigateFunction } from "react-router-dom";
import RouteEnum from "../../enums/route.enum";
import appToast from "../../helpers/appToast";
import { TFunction } from "i18next";

export const loginEffect = (isSuccess:boolean, isError:boolean, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    appToast('success', t('menu.settings'), { duration: 4000 });
    navigate(RouteEnum.HOTEL);
  }

  if (isError) {
    appToast('error', t('menu.settings'), { duration: 4000 });
  }
}

export const signUpEffect = (isSuccess:boolean, isError:boolean, navigate:NavigateFunction,t:TFunction<"translation", undefined>
) => {
  if (isSuccess) {
    appToast('success', t('menu.settings'), { duration: 4000 });
    navigate(RouteEnum.HOTEL);
  }

  if (isError) {
    appToast('error', t('menu.settings'), { duration: 4000 });
  }
}