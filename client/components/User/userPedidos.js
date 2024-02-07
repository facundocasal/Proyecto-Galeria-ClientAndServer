import React from "react";

const UserPedidos = ({ purchase }) => {
  return (
    <>
      <h2 className="text-white">Historial de Pedidos</h2>
      <table className={"table  text-white"}>
        <thead>
          <tr>
            <th scope="col">Artis</th>
            <th scope="col">Galeria</th>
            <th scope="col">Fecha</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {purchase?.map((user, i) => (
            <tr key={i}>
              <td>{user.artis}</td>
              <td>{user.galleryName}</td>
              <td>{user.date}</td>
              <td>${user.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserPedidos;
