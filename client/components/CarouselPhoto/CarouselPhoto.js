/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import UploadMedia from '../UploadMedia/UploadMedia';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Forms.module.css';

const CarouselPhoto = () => {
  const [artis, setArtis] = useState([]);
  const [coverImage, setCoverImage] = useState('');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await clientAxios.post('/artis', data);
  };

  const handleArtis = async () => {
    const response = await clientAxios.get('/artis');
    setArtis(response.data);
  };

  const handleCoverImage = (arrayImages) => {
    setCoverImage(arrayImages);
  };

  useEffect(() => {
    handleArtis();
  }, []);

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 pt-5">
        <h2 style={{ color: '#D44F80' }}>CREAR CARRUSEL</h2>
        <label className={`form-label ${styles.title}`}>Nombre de Artis</label>
        <select
          className={`form-select ${styles.placeholder}`}
          {...register('idArtis', { required: true })}
        >
          <option selected>Seleccione una Artis</option>
          {artis.length > 0
            && artis.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-3">
        <UploadMedia
          onSave={handleCoverImage}
          label="Cargar foto de Carousel para escritorio"
        />
      </div>
      <div className="mb-3">
        <UploadMedia
          onSave={handleCoverImage}
          label="Cargar foto de Carousel para celular"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Crear Foto de Carousel
      </button>
    </form>
  );
};

export default CarouselPhoto;
