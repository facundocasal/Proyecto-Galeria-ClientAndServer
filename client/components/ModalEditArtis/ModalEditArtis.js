import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import LoaderInit from '../Loader/LoaderInit';
import UploadMedia from '../UploadMedia/UploadMedia';
import clientAxios from '../../config/clientAxios';
import style from './modalEditArtis.module.css';

const ModalEditArtis = ({ artis }) => {
  const [banner, setBanner] = useState('');
  const [cover, setCover] = useState('');
  const [Loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    const dataFinish = {
      name: artis.name,
      coverImage: cover,
      photoCarrusel: banner,
    };
    try {
      await clientAxios.post(`artis/${artis._id}`, dataFinish);
      setLoading(false);
      Swal.fire('Artis editada con exito!!');
      push('/artis');
    } catch (error) {
      setLoading(false);
      Swal.fire('Ocurrio un error');
    }
  };

  const deleteArtis = async () => {
    Swal.fire({
      title: `Estas seguro que quieres eliminar a ${artis.name}?, tambien se eliminara su usuario y sus galerias.`,
      showDenyButton: true,
      color: '#FFF8D2',
      background: '#0A1326',
      confirmButtonColor: '#D44F80',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      denyButtonColor: '#D44F80',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clientAxios.delete('artis', { data: artis });
        if (response.status !== 400) {
          Swal.fire({
            icon: 'success',
            iconColor: '#D44F80',
            title: response.data.message,
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
          push('/artis');
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#D44F80',
            title: response.data.message,
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
          push('/artis');
        }
      }
    });
  };

  useEffect(() => {
    if (artis) {
      setCover(artis.coverImage);
      setBanner(artis.photoCarrusel);
    }
  }, [artis]);
  const handleCover = (data) => {
    setCover(data[0]);
  };

  const handleBanner = (data) => {
    setBanner(data[0]);
  };

  if (artis === undefined) return <LoaderInit />;
  return (
    <>
      <div
        container
        className="p-1  d-flex  flex-column flex-wrap align-items-center justify-content-center"
      >
        <div className="text-white col-12 col-md-6 p-1 d-flex flex-column  align-items-center justify-content-center">
          <h4>IMAGEN DE PORTADA</h4>
          <img src={cover} className={style.img}></img>
          <UploadMedia
            multiple={false}
            onSave={handleCover}
            label="Cargar Portada"
            artis={artis?.name}
            folder_type="portada"
          />
        </div>
        <div className=" text-white col-12 col-md-6 p-2 d-flex flex-column  align-items-center justify-content-center">
          <h4>IMAGEN BANNER</h4>
          <img src={banner} className={style.img}></img>
          <UploadMedia
            multiple={false}
            onSave={handleBanner}
            label="Cargar Banner"
            artis={artis?.name}
            folder_type="banner"
          />
        </div>
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        {Loading ? (
          <button disabled className={`btn btn-primary ${style.btnLoading}`}>
            <div className="spinner-border" role="status"></div>
          </button>
        ) : (
          <div>
            <button onClick={onSubmit} className={'btn btn-primary m-2 '}>
              Guardar cambios
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalEditArtis;
