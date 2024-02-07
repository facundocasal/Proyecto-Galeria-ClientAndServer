import 'bootstrap/dist/css/bootstrap.css';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Login from '../Login/Login';
import Register from '../Register/Register';
import styles from './modalsingin.module.css';

const
  ModalSingIn = ({
    isRegister, isLogin, idModal, activeRegister, activeLogin,
  }) => {
    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
      if (activeRegister) {
        setActiveTab(activeRegister);
      }
    }, [activeRegister]);

    useEffect(() => {
      if (activeLogin) {
        setActiveTab(activeLogin);
      }
    }, [activeLogin]);

    return (
    <>
      <div className="modal fade" id={idModal} tabIndex="-1" aria-hidden="true" aria-labelledby="modalSingIn">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${styles.modal}`}>
            <div className="modal-header mb-3 pt-2">
              <h5 className={`modal-title ${styles.title}`} id="modalSingIn">Ingrese sus datos</h5>
              <button type="button" className={`btn-close ${styles.close}`} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className={`nav-item w-50 ${isRegister ? 'd-none' : 'd-block'} ${!isLogin ? 'pe-2 w-50' : 'w-100'}`} role="presentation">
                <button className={`w-100 ${activeTab === 1 && styles.active} ${styles['tab-nav-link']}`} id="pills-login-tab" data-bs-toggle="pill" data-bs-target="#pills-login" type="button" role="tab" aria-controls="pills-login" aria-selected="true" onClick={() => setActiveTab(1)}>Ingresar</button>
              </li>

                <li className={`nav-item ${!isRegister ? 'ps-2 w-50' : 'w-100'} ${isLogin ? 'd-none' : 'd-block'}`} role="presentation">
                  <button className={`w-100 ${activeTab === 2 && styles.active} ${styles['tab-nav-link']}`} id="pills-register-tab" data-bs-toggle="pill" data-bs-target="#pills-register" type="button" role="tab" aria-controls="pills-register" aria-selected="false" onClick={() => setActiveTab(2)}>Registro</button>
                </li>

            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className={`tab-pane fade pt-3 ${activeTab === 1 ? 'show active' : null}`} id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab"><Login /></div>
              <div className={`tab-pane fade pt-3 ${activeTab === 2 ? 'show active' : null}`} id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab"><Register /></div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };

ModalSingIn.propTypes = {
  isRegister: PropTypes.bool,
  isLogin: PropTypes.bool,
  idModal: PropTypes.string.isRequired,
  activeRegister: PropTypes.number,
  activeLogin: PropTypes.number,
};

ModalSingIn.defaultProps = {
  activeRegister: 1,
};

export default ModalSingIn;
