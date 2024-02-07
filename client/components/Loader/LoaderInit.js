import React from 'react';
import Image from 'next/image';
import style from './LoaderInit.module.css';

const LoaderInit = () => {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ backgroundColor: '#050914', height: '100vh' }}>

      <Image className={style.img__loader} width={147.6} height={61} src='/images/logo.png' alt='logo' quality={100}/>

    </div>
  );
};

export default LoaderInit;
