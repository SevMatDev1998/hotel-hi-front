import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout: FC = () => {
  return (
    <div className="min-h-screen flex  ">

      <div className="w-full mobile:w-full  flex items-center justify-center p-8">
        <div className="w-full  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;