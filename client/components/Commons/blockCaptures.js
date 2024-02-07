import React, { Children, useEffect } from 'react';

import Swal from 'sweetalert2';

const BlockCaptures = ({ children }) => {
  function lockoutAlert(icon_alert, title_alert, text_alert) {
    Swal.fire({
      icon: icon_alert,
      title: title_alert,
      text: text_alert,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'popup-class',
        confirmButton: 'btn-ok',
      },
      width: 680,
    });
  }
  useEffect(() => {
    document.oncontextmenu = () => false;
    document.oncut = () => false;
    document.oncopy = () => false;
    document.onpaste = () => false;
    document.ondrag = () => false;
    document.ondrop = () => false;
  });

  function optionsToDisable(e) {
    if ((e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.key === 'P')) {
      // Bloqueo de impresiones --> Comando Ctrl+P
      lockoutAlert(
        'error',
        'Esta sección no se permite imprimir o exportar en PDF',
        'Solicitamos no intentarlo de nuevo.',
      );
      e.preventDefault();
    } else if (e.metaKey && e.shiftKey) {
      // Se sobrepone pantalla ante recorte del Sistema Operativo Windows --> Comando Windows+Shift+S
      Swal.fire({
        icon: 'warning',
        title: 'Recortes de pantalla detectados!',
        text: 'Solicitamos no intentarlo de nuevo.',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        grow: 'fullscreen',
      });
    } else if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'C')) {
      // Bloqueo de copiado --> Comando Ctrl+C
      lockoutAlert(
        'error',
        'Esta sección no se permite copiar',
        'Solicitamos no intentarlo de nuevo.',
      );
      e.preventDefault();
    } else if ((e.ctrlKey && e.key === 'x') || (e.ctrlKey && e.key === 'X')) {
      // Bloqueo de cortado --> Comando Ctrl+X
      lockoutAlert(
        'error',
        'Esta sección no se permite cortar',
        'Solicitamos no intentarlo de nuevo.',
      );
      e.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        // Deshabilita captura de pantalla --> Tecla (imp pnt)
        navigator.clipboard.writeText(' ');
        lockoutAlert(
          'error',
          'Capturas de pantalla deshabilitadas!',
          'Solicitamos no intentarlo de nuevo.',
        );
      }
    });
    document.addEventListener('keydown', (e) => {
      optionsToDisable(e);
    });
  }, []);
  return (
    <>
    {children}
    </>
  );
};

export default BlockCaptures;
