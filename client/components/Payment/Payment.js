import styles from './payment.module.css';

const Payment = () => {
  return (
    <div className='container'>
      <div className={`${styles.box}`}>
        <div className="row m-0">
          <div className='col-lg-6 col-md-6 col-12'>
            <p className='text-center m-2'><i className="bi bi-credit-card fs-1"></i></p>
            <p className='text-center'>Tarjeta de Crédito</p>
          </div>
          <div className='col-lg-6 col-md-6 col-12'>
            <p className='text-center m-2'><i className="bi bi-paypal fs-1"></i></p>

            <p className='text-center'>Paypal</p>
          </div>
          <div className='col-lg-6 col-md-6 col-12'>
            <p className='text-center m-2'><i className="bi bi-paypal fs-1"></i></p>
            <p className='text-center'>Mercado Pago</p>
          </div>
          <div className='col-lg-6 col-md-6 col-12'>
            <p className='text-center m-2'><i className="bi bi-bank2 fs-1"></i></p>
            <p className='text-center'>Transferencia Bancaria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
