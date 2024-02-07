import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import BtnPaypal from '../Paypal/btnPaypal';
import clientAxios from '../../config/clientAxios';
import styles from './modalPay.module.css';

const ModalPay = ({
  item, artis, price, galleryName, price_USD, type,
}) => {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);
  const [isLoading, setIsLoading] = useState(false);
  const [linkMP, setlinkMP] = useState('');
  const [preferenceId, setPreferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonPayPal, setButtonPayPal] = useState(false);

  const handleClickMercadoPago = async () => {
    const pedido = type === 'sub' ? { artis } : { galleryName };
    setErrorMessage('');
    try {
      setIsLoading(true);
      const response = await clientAxios.post(
        '/mercadopago/createPayment',
        pedido,
      );
      setButtonPayPal(false);

      // console.log(response.data);
      // setlinkMP(response.data.mpLink);
      setPreferenceId(response.data.preferenseId);
      setIsLoading(false);
    } catch (error) {
      if (error.response.data.message === 'items needed') {
        setButtonPayPal(false);
        setErrorMessage(
          `Ya cuentas con una suscripción activa en todas las galerías de ${artis}`,
        );
      }
    }
  };

  const handlePayPal = () => {
    // setlinkMP('');
    setIsLoading(true);
    setPreferenceId('');
    setErrorMessage('');
    setButtonPayPal(true);
    setIsLoading(false);
  };
  return (
    <div className="container">
      <div className={`${styles.box} p-2`}>
        {item && (
          <p className={`m-0 text-center ${styles.title}`}>
            <span>Galeria:</span> {item}
          </p>
        )}
        <p className={`m-0 text-center ${styles.title}`}>
          <span>Artis:</span> {artis}
        </p>
        <p className={`m-0 text-center ${styles.title}`}>
          <span>Precio:</span> $ {price} - US$ {price_USD}
        </p>
        {type === 'sub' && (
          <p className={`m-0 text-center ${styles.title}`}>
            <span>Aviso:</span> Las galerías ya adquiridas se descontaran del
            total a pagar.
          </p>
        )}
        <div className="row m-0">
          <button
            className="col-lg-6 col-md-6 col-12 btn"
            onClick={handlePayPal}
          >
            <p className="text-center m-2">
              <i className="bi bi-paypal fs-1"></i>
            </p>
            <p className="text-center">Paypal</p>
          </button>
          <button
            className="col-lg-6 col-md-6 col-12 btn "
            onClick={handleClickMercadoPago}
          >
            <p className="text-center m-2">
              <i className="bi bi-credit-card fs-1"></i>
            </p>
            <p className="text-center">Mercado Pago</p>
          </button>
        </div>
        <div className="w-75 m-auto text-center">
          <p>{errorMessage && errorMessage}</p>
        </div>
        {isLoading && <Spinner animation="grow" size="sm" />}
        {preferenceId && (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: 'smart_option' } }}
          />
        )}
        {buttonPayPal && (
          <div style={{ width: 'fit-content', margin: '0 auto' }}>
            <BtnPaypal
              type={type}
              galleryName={galleryName}
              artis={artis}
              setErrorMessage={setErrorMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPay;
