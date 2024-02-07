import * as Yup from 'yup';

/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadMedia from '../UploadMedia/UploadMedia';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Forms.module.css';

const NewGallery = ({ artisSelect }) => {
  const [artis, setArtis] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [coverPhotoGallery, setCoverPhotoGallery] = useState('');
  const [three, setThree] = useState([]);
  const [censoriship, setCensoriship] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameOfTheGalllery, setGalleryName] = useState('');

  const { province } = parseCookies();
  const schema = Yup.object({
    idArtis: Yup.string().required('Tienes que seleccionar una Artis'),
    galleryName: Yup.string().required('El nombre de la galeria es requerido'),
    price: Yup.string()
      .min(2, 'El precio debe tener como minimo 2 cifras')
      .required('El precio es requerido'),
    price_USD: Yup.string()
      .min(2, 'El precio debe tener como minimo 2 cifras')
      .required('El precio en dolares es requerido'),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const dataFinished = {
      ...data,
      coverPhotoGallery: coverPhotoGallery[0],
      photoBlur: censoriship[0],
      photosShow: three,
      photos: gallery,
    };

    clientAxios
      .post('galleries', dataFinished)
      .then((response) => {
        Swal.fire('Galeria creada con exito');
        setCoverPhotoGallery('');
        setThree([]);
        setGallery([]);
        setCensoriship('');
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleArtis = async () => {
    if (province) {
      clientAxios
        .get('/artis/admin')
        .then((response) => setArtis(response.data));
    }
  };

  const handleGalleryImages = (arrayImages) => {
    setGallery(arrayImages);
  };

  const handleCoverPhotoGallery = (data) => {
    setCoverPhotoGallery(data);
  };

  const handleDeleteCover = (img) => {
    setCoverPhotoGallery(coverPhotoGallery.filter((res) => res !== img));
  };

  const handleDeleteThree = (img) => {
    setThree(three.filter((res) => res !== img));
  };

  const handleThreeImages = (img) => {
    if (three === 3) return;
    setThree(img);
  };
  const handleCensorshipImage = (img) => {
    setCensoriship(img);
  };

  useEffect(() => {
    handleArtis();
  }, [artisSelect]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 pt-5">
        <h2 style={{ color: '#D44F80' }}>CREAR GALERIA</h2>
        <label
          htmlFor="exampleInputEmail1"
          className={`form-label ${styles.title}`}
        >
          Nombre de Artis
        </label>
        <select
          className={`form-select ${styles.placeholder}`}
          aria-label="Default select example"
          {...register('idArtis', { required: true })}
          onChange={(e) => setName(e.target.value)}
        >
          <option selected>Seleccione una Artis</option>
          {artis.length > 0
            && artis.map((x) => (
              <option key={x._id} value={x.name}>
                {x.name}
              </option>
            ))}
        </select>
        {errors.idArtis && (
          <span className={'text-danger'}>{errors.idArtis.message}</span>
        )}
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className={`form-label ${styles.title}`}
        >
          Nombre de la Galería
        </label>
        <input
          type="text"
          className={`form-control ${styles.placeholder}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register('galleryName', { required: true })}
          onChange={(e) => setGalleryName(e.target.value)}
        />
        {errors.galleryName && (
          <span className={'text-danger'}>{errors.galleryName.message}</span>
        )}
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>
            Foto de portada
          </label>
        </div>
        <UploadMedia
          multiple={false}
          onSave={handleCoverPhotoGallery}
          label="Cargar foto portada"
          artis={name}
          folder_type="portada"
          isGallery={true}
          gallery_name={nameOfTheGalllery}
        />
        <div className="d-flex flex-wrap ">
          {coverPhotoGallery?.length > 0 && (
            <img className={styles.image} src={coverPhotoGallery} alt=""></img>
          )}
        </div>
      </div>
      <div className="d-flex col-12 justify-content-between flex-wrap">
        <div className="mb-3 col-md-5 col-sm-12">
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label ${styles.title}`}
          >
            Precio de la Galeria en ARS
          </label>
          <input
            type="number"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register('price', { required: true })}
          />
          {errors.price && (
            <span className={'$text-danger'}>{errors.price.message}</span>
          )}
        </div>
        <div className="mb-3 col-md-5 col-sm-12">
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label ${styles.title}`}
          >
            Precio de la Galeria en USD
          </label>
          <input
            type="number"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register('price_USD', { required: true })}
          />
          {errors.price_USD && (
            <span className={'$text-danger'}>{errors.price_USD.message}</span>
          )}
        </div>
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>
            Galería de Fotos
          </label>
        </div>
        <div className="mb-3">
          <UploadMedia
            multiple={true}
            onSave={handleThreeImages}
            label="Cargar 3 Fotos sin censura"
            folder_type="no-censura"
            isGallery={true}
            artis={name}
            gallery_name={nameOfTheGalllery}
          />
          <div className="d-flex flex-wrap ">
            {three.length > 0
              && three?.map((or) => {
                return (
                  <div className="position-relative" key={or}>
                    <img className={styles.image} src={or} alt={or} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mb-3">
          <UploadMedia
            multiple={false}
            onSave={handleCensorshipImage}
            label="Cargar Foto Censurada"
            folder_type="censura"
            artis={name}
            isGallery={true}
            gallery_name={nameOfTheGalllery}
          />
          <div className="d-flex flex-wrap ">
            <div className="position-relative">
              {censoriship?.length > 0 && (
                <img className={styles.image} src={censoriship} alt=""></img>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <UploadMedia
            multiple={true}
            onSave={handleGalleryImages}
            label="Cargar fotos de Galeria"
            folder_type="gallery"
            artis={name}
            isGallery={true}
            gallery_name={nameOfTheGalllery}
          />

          <div className="d-flex flex-wrap ">
            {gallery.length > 0
              && gallery?.map((or) => {
                return (
                  <>
                    <div className="position-relative">
                      <img
                        className={styles.image}
                        key={or}
                        src={or}
                        alt={or}
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          !(
            three.length > 0
            && coverPhotoGallery
            && censoriship
            && gallery.length > 0
          )
        }
        className="btn btn-primary"
      >
        {' '}
        {loading ? 'Creando galeria...' : 'Crear galería'}{' '}
      </button>
    </form>
  );
};

NewGallery.propTypes = {
  artisSelect: PropTypes.bool.isRequired,
};

export default NewGallery;
