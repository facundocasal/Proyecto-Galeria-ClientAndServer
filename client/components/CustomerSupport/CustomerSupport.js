import React from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import styles from './customerSupport.module.css';

const CustomerSupport = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    emailjs.send('service_tr0yapg', 'template_j5vmy83', data, 'GVmcDc7Bz93KTDHhQ')
      .then((result) => {
        if (result.text === 'OK') {
          Swal.fire({
            icon: 'success',
            iconColor: '#D44F80',
            title: 'Consulta enviada!',
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#D44F80',
            title: 'Ha ocurrido un error!',
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
        }
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className={`container-fluid ${styles.bgHome}`}>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <span className={`input-group-text ${styles.icon}`}><i className="bi bi-person"></i></span>
              <input type="text" placeholder="Nombre" name='firstName' {...register('firstName', { required: true })} className={`form-control ${styles.inputStyle}`} id="firstName" />
            </div>
              {errors.firstName?.type === 'required' && <p className={`${styles.error}`}>* El nombre es requerido</p>}
            <div className="input-group mb-3">
              <span className={`input-group-text ${styles.icon}`}><i className="bi bi-at"></i></span>
              <input type="email" placeholder="Correo Electrónico" name='email' {...register('email', { required: true })} className={`form-control ${styles.inputStyle}`} id="email" />
            </div>
              {errors.email?.type === 'required' && <p className={`${styles.error}`}>* El email es requerido</p>}
            <div className="input-group mb-3">
              <span className={`input-group-text ${styles.icon}`}><i className="bi bi-person"></i></span>
              <input type="text" placeholder="Asunto" name='affair' {...register('affair', { required: true })} className={`form-control ${styles.inputStyle}`} id="affair" />
            </div>
              {errors.affair?.type === 'required' && <p className={`${styles.error}`}>* El asunto es requerido</p>}
            <div className="input-group mb-3">
              <span className={`input-group-text ${styles.icon}`}><i className="bi bi-envelope align-items-start"></i></span>
              <textarea placeholder="Ingrese su mensaje" name='message' className={`form-control ${styles.inputStyle}`} {...register('message', { required: true })} id="message" rows="3"></textarea>
            </div>
              {errors.message && <p className={`${styles.error}`}>* El mensaje es requerido</p>}
            <div className='d-flex justify-content-end mb-3'>
              <button type="submit" className={styles.buttonForm}>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
