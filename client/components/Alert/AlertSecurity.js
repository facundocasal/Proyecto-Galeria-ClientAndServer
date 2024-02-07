import Modal from 'react-bootstrap/Modal';
import classesText from '../../styles/Galleries.module.css';

function AlertSecurity({ alert, handleAcept }) {
  return (
    <Modal centered show={alert}>
        <Modal.Header className={`${classesText.bgHome}`}>
        <Modal.Title className={` ${classesText.title}`}>
           ¡ALERTAS DE SEGURIDAD!
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className={`${classesText.bgHome}`}>
        <p className={`p-2 text-center ${classesText.title}`}>Evita sanciones y bloqueos permanentes de tu cuenta, Proyecto Galería cuenta con
                        herramientas para localizar los intentos de extracción de contenido.</p>
        </Modal.Body>
        <Modal.Footer className={`${classesText.bgHome}`}>
        <button onClick={handleAcept} className={`btn ${classesText.button}`}>
          <span>Aceptar</span>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertSecurity;
