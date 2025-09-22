import React, { FC, ReactNode } from 'react';

interface IAuthLayoutProps{
  children:ReactNode
}

const AuthLayout:FC<IAuthLayoutProps> = ({children}) => {
  return (
    <div className='bg-red-500'>
      {children}
    </div>
  );
};

export default AuthLayout;