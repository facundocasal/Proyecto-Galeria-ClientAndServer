import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import firebase from '../../config/firebase';
import styles from '../../styles/Forms.module.css';

const UploadMedia = ({
  onSave,
  isImage = true,
  multiple = false,
  label,
  artis,
  folder_type,
  isGallery = false,
  gallery_name = undefined,
}) => {
  const [images, setImages] = useState([]);

  const [button, setButton] = useState(false);

  const media_type = isImage ? 'images' : 'video';

  const DatePrefix = () => new Date();

  const files_ref = useRef();

  const handleClick = () => {
    if (isGallery) {
      Swal.fire({
        title: 'Antes de subir!',
        text: `¿Estás seguro de que quieres subir esta imagen a "artiss/${artis}/${media_type}/${gallery_name}"?, ten en cuenta que el nombre de la galeria creara una carpeta.`,
        icon: 'question',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      }).then((upload) => {
        if (upload.isConfirmed && files_ref.current) {
          files_ref.current.click();
        }
      });
    } else {
      Swal.fire({
        title: 'Antes de subir!',
        text: `¿Estás seguro de que quieres subir esta imagen a "artiss/${artis}"?, ten en cuenta que el nombre creara una carpeta.`,
        icon: 'question',
        confirmButtonText: 'Seleccionar imagen',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      }).then((upload) => {
        if (upload.isConfirmed && files_ref.current) {
          files_ref.current.click();
        }
      });
    }
  };

  const TaskError = (err) => {
    throw Error(err.message);
  };

  const UploadFiles = (imageFile) => {
    return new Promise((resolve, reject) => {
      const date = `${DatePrefix().getDate()}${DatePrefix().getMonth()}${DatePrefix().getFullYear()}${DatePrefix().getHours()}${DatePrefix().getMinutes()}${DatePrefix().getSeconds()}`;

      let stref;

      if (isGallery) {
        stref = ref(
          firebase,
          `/artiss/${artis}/${media_type}/${gallery_name}/${folder_type}/${date}_${imageFile.name}`,
        );
      } else {
        stref = ref(
          firebase,
          `/artiss/${artis}/${media_type}/${folder_type}/${date}_${imageFile.name}`,
        );
      }
      const task = uploadBytesResumable(stref, imageFile);
      task.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          if (percent === 100) {
            setButton(true);
          }
        },
        TaskError,
        async () => {
          const downloadURL = await getDownloadURL(task.snapshot.ref);
          resolve(downloadURL);
        },
      );
    });
  };

  const handleOnChange = async (e) => {
    const { files } = e.target;

    for (let i = 0; i < files.length; i += 1) {
      const imageFile = files[i];

      UploadFiles(imageFile).then((url) => {
        setImages((prevImages) => [...prevImages, url]);
      });
    }
  };

  useEffect(() => {
    onSave(images);
  }, [images]);

  return (
    <>
      <input
        ref={files_ref}
        onChange={handleOnChange}
        type="file"
        hidden
        multiple={multiple}
      />

      {files_ref && (
        <button
          style={{ width: '100%' }}
          type="button"
          onClick={handleClick}
          className={`btn ${styles.button}`}
          disabled={isGallery ? !gallery_name : button || !artis}
        >
          {label}
        </button>
      )}
    </>
  );
};

UploadMedia.propTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default UploadMedia;
