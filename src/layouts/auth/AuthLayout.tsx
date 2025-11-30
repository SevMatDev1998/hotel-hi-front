import React, { FC, ReactNode } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  const {t} = useTranslation()
  return (
    <div className="min-h-screen flex bg-dusty-teal ">
      {/* Left side - Green background with text and logo */}
      <div className="w-1/3  flex-col justify-center items-center px-8 py-12 text-white mobile:hidden">

        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="">
              <img src="images/icons/mainLogo.svg" />
            </div>
            <h1 className="text-54">hotel hive</h1>
          </div>
        </div>

        {/* Armenian text content */}
        <div className="text-start max-w-md space-y-4 ">
          <p className="text-16 ">
            {t("auth.info.welcome")}
          </p>
          <p className="text-16 ">
            {t("auth.info.best_part")}
          </p>
          <p className="text-18 ">
            {t("auth.info.free")}
          </p>
          <p className="text-16 ">
            {t("auth.info.join_today")}
          </p>
        </div>
      </div>

      {/* Right side - White background with form */}
      <div className="w-2/3 mobile:w-full mobile:rounded-l-[0px] bg-white flex items-center justify-center p-8 rounded-l-[50px]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;