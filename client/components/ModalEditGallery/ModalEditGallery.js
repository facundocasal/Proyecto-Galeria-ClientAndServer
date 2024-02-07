import * as Yup from "yup";

import React, { useEffect, useState } from "react";

import LoaderInit from "../Loader/LoaderInit";
import Swal from "sweetalert2";
import UploadMedia from "../UploadMedia/UploadMedia";
import clientAxios from "../../config/clientAxios";
import style from "../ModalEditArtis/modalEditArtis.module.css";
import styles from "./modalEditGallery.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const ModalEditGallery = ({ galeria }) => {
  const [threPhotos, setThrePhotos] = useState([]);
  const [blur, setBlur] = useState("");
  const [cover, setCover] = useState("");
  const [nameOfTheGalllery, setGalleryName] = useState("");

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const UpdateUserSchema = Yup.object().shape({
    galleryName: Yup.string().required("Nombre es requerido"),
    price: Yup.number().required("Precio ARS es requerido"),
    price_USD: Yup.number().required("Precio USD es requerido"),
  });
  const defaultValues = {
    galleryName: galeria?.galleryName,
    price_USD: galeria?.price_USD,
    price: galeria?.price,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (galeria) {
      reset(defaultValues);
      setThrePhotos(galeria.photosShow);
      setCover(galeria.coverPhotoGallery);
      setBlur(galeria.photoBlur);
      setGalleryName(galeria.galleryName);
    }
  }, [galeria]);

  const onSubmit = async (data) => {
    setLoading(true);
    const dataFinish = {
      _id: galeria._id,
      galleryName: data.galleryName,
      price: data.price,
      price_USD: data.price_USD,
      photoBlur: blur,
      coverPhotoGallery: cover,
      photosShow: threPhotos,
    };
    try {
      await clientAxios.post("galleries/updateGallerie", dataFinish);
      setLoading(false);
      Swal.fire("Galeria editada correctamente");
      push(`/${data.galleryName}/edit`);
    } catch (error) {
      setLoading(false);
      Swal.fire("Ocurrio un error");
      push(`/${data.galleryName}/edit`);
    }
  };

  const deleteGallery = async () => {
    Swal.fire({
      title: `Estas seguro que quieres eliminar "${galeria?.galleryName}"?.`,
      showDenyButton: true,
      color: "#FFF8D2",
      background: "#0A1326",
      confirmButtonColor: "#D44F80",
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
      denyButtonColor: "#D44F80",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clientAxios.delete(
          `galleries/delete/${galeria._id}`
        );
        if (response.status !== 400) {
          Swal.fire({
            icon: "success",
            iconColor: "#D44F80",
            title: response.data.message,
            color: "#FFF8D2",
            background: "#0A1326",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#D44F80",
          });
          push("/galleries");
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#D44F80",
            title: response.data.message,
            color: "#FFF8D2",
            background: "#0A1326",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#D44F80",
          });
          push("/galleries");
        }
      }
    });
  };

  const handleCover = (data) => {
    setCover(data[0]);
  };
  const handleThree = (data) => {
    setThrePhotos(data);
  };
  const handleBlur = (data) => {
    setBlur(data[0]);
  };

  if (galeria === undefined) return <LoaderInit />;
  return (
    <div className="p-5 d-flex   justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="d-flex w-100 justify-content-center flex-wrap">
          <div className="mb-3 m-2">
            <label
              htmlFor="nombreGaleria"
              className={`form-label ${styles.label_edit}`}
            >
              Nombre{" "}
            </label>
            <input
              autoComplete="false"
              type="text"
              className="form-control"
              id="nombreGaleria"
              {...register("galleryName", { required: "Nombre es requerido" })}
              onChange={(e) => setGalleryName(e.target.value)}
            />
            {errors.galleryName && (
              <p className="text-danger">Nombre es requerido</p>
            )}
          </div>
          <div className="mb-3 m-2">
            <label
              htmlFor="precioArs"
              className={`form-label ${styles.label_edit}`}
            >
              Precio ARS
            </label>
            <input
              type="number"
              className="form-control"
              id="precioArs"
              {...register("price", { required: "Precio ARS es requerido" })}
            />
            {errors.price && (
              <p className="text-danger">Precio ARS es requerido</p>
            )}
          </div>
          <div className="mb-3 m-2">
            <label
              htmlFor="precioUsd"
              className={`form-label ${styles.label_edit}`}
            >
              Precio USD
            </label>
            <input
              type="number"
              className="form-control"
              id="precioUsd"
              {...register("price_USD", {
                required: "Precio USD es requerido",
              })}
            />
            {errors.price_USD && (
              <p className="text-danger">Precio USD es requerido</p>
            )}
          </div>
        </section>

        <h4 className="text-white">FOTOS</h4>
        <section
          className={`w-100 d-flex flex-wrap flex-column align-items-center justify-content-center ${styles.container_photos}`}
        >
          <div className="col-md-3 m-2 ">
            <h4 className="text-white">Portada</h4>
            <img
              src={cover}
              alt={galeria?.galleryName}
              style={{ width: "100%" }}
            />
          </div>
          <div
            className="col-md-3 m-2 d-flex"
            style={{ border: "1px solid #fff", maxHeight: "50px" }}
          >
            <UploadMedia
              multiple={false}
              onSave={handleCover}
              label="+ Editar"
              artis={galeria?.idArtis}
              folder_type="portada"
              isGallery={true}
              gallery_name={nameOfTheGalllery}
            />
          </div>
        </section>
        <div className="w-100 d-flex justify-content-center">
          {loading ? (
            <button disabled className={`btn btn-primary ${style.btnLoading}`}>
              <div className="spinner-border" role="status"></div>
            </button>
          ) : (
            <>
              <div>
                <button type="submit" className={"btn btn-primary m-2 "}>
                  Guardar Cambios
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={deleteGallery}
                  className="btn btn-danger"
                >
                  Eliminar Galeria.
                  <i className="bi bi-trash3 m-2 "></i>
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModalEditGallery;
