import React, { FC } from 'react';

interface IInfoBlockProps {
  text:string
}

const InfoBlock:FC<IInfoBlockProps> = ({ text }) => {
  return (
    <div className='p-3 bg-light-blue rounded-[10px] flex items-center gap-1'>
      <img src="/images/icons/info-blue-icon.svg" alt="info icon" className="inline-block mr-2" />
      <p className='text-aqua-sky'> {text}</p>
    </div>
  );
};

export default InfoBlock;