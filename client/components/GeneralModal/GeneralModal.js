import PropTypes from 'prop-types';
import styles from './ganeralmodal.module.css';

const GeneralModal = ({ children, id, name }) => {
  return (
    <div className={`modal ${styles.containerModal}`} id={id} tabIndex="-1" aria-labelledby="modalInfo" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content py-3 px-5 rounded-0 ${styles.modalStyle}`}>
        <div className="modal-header">
        <h5 className="modal-title" id="modalInfo">{name}</h5>
          <button type="button" className={`btn-close ${styles.close}`} data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          { children }
        </div>
        </div>
      </div>
    </div>
  );
};

GeneralModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default GeneralModal;
