import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import Swal from "sweetalert2";
import clientAxios from "../../config/clientAxios";
import { useRouter } from "next/router";
import { useState } from "react";

const BtnPaypal = ({ artis, galleryName, type, setErrorMessage }) => {
  const router = useRouter();

  return (
    <>
      <div>
        <PayPalScriptProvider
          options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_KEY }}
        >
          <PayPalButtons
            createOrder={async () => {
              try {
                setErrorMessage("");
                const data =
                  type === "sub"
                    ? {
                        data: artis,
                      }
                    : {
                        data: galleryName,
                      };
                const res = await clientAxios.post("purchase/paypal", data);
                return res.data.id;
              } catch (err) {
                console.log(err);
                alert(
                  "OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES"
                );
              }
            }}
            onCancel={(data) => console.log("compra cancelada", data)}
            onApprove={async (data, actions) => {
              try {
                const res = await clientAxios.post("purchase/paypalIpn", {
                  id: data.orderID,
                  artis,
                });
                if (res.status === 400) {
                  Swal.fire({
                    icon: "error",
                    iconColor: "#D44F80",
                    title: "No se pudo realizar la compra por PAYPAL",
                    color: "#FFF8D2",
                    background: "#0A1326",
                    confirmButtonText: "Cerrar",
                    confirmButtonColor: "#D44F80",
                  });
                }
                if (res.status === 201) {
                  router.reload(window.location.pathname);
                }
              } catch (error) {
                alert(
                  "OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES"
                );
                router.reload(window.location.pathname);
              }
            }}
            onError={(err) => {
              setErrorMessage(
                `Ya cuentas con una suscripción activa en todas las galerías de ${artis}`
              );
              console.log("error al realizar la transaccion");
            }}
            style={{
              layout: "horizontal",
              color: "silver",
              height: 45,
              tagline: false,
            }}
          />
        </PayPalScriptProvider>
      </div>
    </>
  );
};

export default BtnPaypal;
