import React, { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Login from './Login/Login';

const Error = ({ texto, number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ProyectoGalería</title>
        <meta name="description" content="ProyectoGalería" />
      </Head>
      <section
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: '100vh', backgroundColor: '#050914', color: '#ffff' }}
      >
            <h1 style={{ color: '#D44F81' }}>ERROR {number && number}</h1>
            <h3 style={{ textAlign: 'center' }}>{texto}</h3>
            <Image
              width={147.6}
              height={61}
              src="/images/logo.png"
              alt="logo"
              quality={100}
            />
      </section>
    </>
  );
};

export default Error;
