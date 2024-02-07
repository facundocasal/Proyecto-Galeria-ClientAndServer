import CustomerSupport from '../CustomerSupport/CustomerSupport';
import GeneralModal from '../GeneralModal/GeneralModal';
import Link from 'next/link';
import ModalSingIn from '../ModalSingIn/ModalSingIn';
import Payment from '../Payment/Payment';
import PropTypes from 'prop-types';
import styles from './infosection.module.css';
import { useUser } from '../../context/userContext';

const InfoSection = ({ className }) => {
  const { userData } = useUser();
  return (
    <div className={`container py-2 ${className}`}>
      <div className="row justify-content-between">
        <div
          className={`col-sm-2 col-md-6 col-lg-3 pb-lg-0 pb-5 d-flex flex-column justify-content-center align-items-center ${styles.box}`}
          data-bs-toggle="modal"
          data-bs-target="#customerSupport"
        >
          <i className={`bi bi-chat-square-text fs-1 ${styles.iconColor}`}></i>
          <span>ATENCIÓN AL CIENTE</span>
        </div>
        <div
          data-bs-toggle="modal"
          data-bs-target="#paymodal"
          className={`col-sm-12 col-md-6 col-lg-3 pb-lg-0 pb-5 d-flex flex-column justify-content-center align-items-center ${styles.box}`}
        >
          <i
            className={`bi bi-credit-card-2-back fs-1 ${styles.iconColor}`}
          ></i>
          <span>MEDIOS DE PAGO</span>
        </div>
        <div
          data-bs-toggle="modal"
          data-bs-target="#faqmodal"
          className={`col-sm-12 col-md-6 col-lg-3 pb-lg-0 pb-5 d-flex flex-column justify-content-center align-items-center ${styles.box}`}
        >
          <i className={`bi bi-question-circle fs-1 ${styles.iconColor}`}></i>
          <span>PREGUNTAS FRECUENTES</span>
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pt-md-1 ${styles.box}`}>
          {userData.accessToken ? (
            <Link href="/user" passHref>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <i className={`bi bi-person-fill fs-1 ${styles.iconColor}`}></i>
                <span>MI CUENTA</span>
              </div>
            </Link>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              <i className={`bi bi-person-fill fs-1 ${styles.iconColor}`}></i>
              <span>MI CUENTA</span>
            </div>
          )}
        </div>
        <ModalSingIn isLogin idModal="login" activeLogin={1} />
      </div>

      <GeneralModal id="customerSupport" name="ATENCION AL CLIENTE">
        <CustomerSupport />
      </GeneralModal>

      <GeneralModal id="faqmodal" name="PREGUNTAS FRECUENTES">
            {/* data preguntas frecuentes  */}
      </GeneralModal>

      <GeneralModal id="paymodal" name="MEDIOS DE PAGO">
        <Payment />
      </GeneralModal>
    </div>
  );
};

InfoSection.propTypes = {
  className: PropTypes.string.isRequired,
};

export default InfoSection;
