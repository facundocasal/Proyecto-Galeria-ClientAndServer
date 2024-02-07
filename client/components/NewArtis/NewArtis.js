import * as Yup from "yup";

import React, { useEffect, useState } from "react";

import AutocompleteChips from "../AutocompleteChips/AutocompleteChips";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import UploadMedia from "../UploadMedia/UploadMedia";
import clientAxios from "../../config/clientAxios";
import { provinces } from "./provinces";
import styles from "../../styles/Forms.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const style = "mb-3 col-md-6 col-sm-12 p-1";

const NewArtis = ({ setArtis }) => {
  const schema = Yup.object({
    name: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    email: Yup.string()
      .email("Formato Invalido")
      .required("Email es requerido"),
    password: Yup.string()
      .min(3, "La contraseña debe tener 3 caracteres como minimo")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .max(25, "La contraseña puede tener 25 caracteres como maximo")
      .required("Contraseña es requerida"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [imageBanner, setImageBanner] = useState();
  const [provincesSelected, setProvincesSelected] = useState([]);
  const resetIamge = () => {
    setImage([]);
    setImageBanner([]);
  };
  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      coverImage: image[0],
      photoCarrusel: imageBanner[0],
      provinces: provincesSelected.map((province) => province.name),
    };

    clientAxios
      .post("/artis", finalData)
      .then((response) => {
        if (response.status === 200) {
          setArtis(true);
          reset();
          resetIamge();
          Swal.fire({
            icon: "success",
            iconColor: "#D44F80",
            title: "Artis creada con éxito",
            color: "#FFF8D2",
            background: "#0A1326",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#D44F80",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: "#D44F80",
          title: "No se puede crear la Artis, Artis existente u otro motivo",
          color: "#FFF8D2",
          background: "#0A1326",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "#D44F80",
        });
      });
  };
  const getProvincesLocked = (provincesGet) => {
    setProvincesSelected(provincesGet);
  };
  const handleImage = (data) => {
    setImage(data);
  };
  const handleImageBanner = (data) => {
    setImageBanner(data);
  };

  const setArtisName = (e) => {
    setName(e.target.value);
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ color: "#D44F80" }}>CREAR ARTIS</h2>

      <div className="d-md-flex flex-wrap justify-content-between">
        <div className={style}>
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label ${styles.title}`}
          >
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("name", { required: true })}
            onChange={setArtisName}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className={style}>
          <label
            htmlFor="exampleInputEmail2"
            className={`form-label ${styles.title}`}
          >
            Apellido
          </label>
          <input
            type="text"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-danger">{errors.lastName.message}</span>
          )}
        </div>
        <div className={style}>
          <label
            htmlFor="exampleInputEmail3"
            className={`form-label ${styles.title}`}
          >
            Email
          </label>
          <input
            type="text"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail3"
            aria-describedby="emailHelp"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className={style}>
          <label
            htmlFor="exampleInputEmail4"
            className={`form-label ${styles.title}`}
          >
            Contraseña
          </label>
          <input
            type="text"
            className={`form-control ${styles.placeholder}`}
            id="exampleInputEmail4"
            aria-describedby="emailHelp"
            {...register("password", {
              required: "* Este campo es requerido",
              minLength: {
                value: 8,
                message: "* La contraseña debe contener al menos 8 caracteres",
              },
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message: "Debe contener una mayuscula y un numero",
              },
            })}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
      </div>
      <AutocompleteChips
        options={provinces}
        getProvincesLocked={getProvincesLocked}
      />

      <div className="mb-3">
        {image?.length > 0 ? (
          <button className="btn btn-primary" disabled>
            Cargar Portada
          </button>
        ) : (
          <UploadMedia
            multiple={false}
            onSave={handleImage}
            label="Cargar Portada"
            artis={name}
            folder_type="portada"
          />
        )}
      </div>
      <div className="position-relative">
        {image?.length > 0 && (
          <img className={styles.image} src={image} alt=""></img>
        )}
      </div>
      <div className="mb-3">
        {imageBanner?.length > 0 ? (
          <button className="btn btn-primary" disabled>
            Cargar Banner
          </button>
        ) : (
          <UploadMedia
            multiple={false}
            onSave={handleImageBanner}
            label="Cargar Banner"
            artis={name}
            folder_type="banner"
          />
        )}
      </div>
      <div className="position-relative">
        {imageBanner?.length > 0 && (
          <img className={styles.image} src={imageBanner}></img>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={!(image?.length > 0)}
          className={"btn btn-primary"}
        >
          CREAR ARTIS
        </button>
      </div>
    </form>
  );
};

NewArtis.propTypes = {
  setArtis: PropTypes.func.isRequired,
};

export default NewArtis;
