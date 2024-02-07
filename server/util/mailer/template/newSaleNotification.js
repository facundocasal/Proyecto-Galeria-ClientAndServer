const mailerNewSale = (userName, galleryName, artist, method, price) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Notificación de nueva venta</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: #e60969;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        text-align: center;
        padding: 20px;
      }
      .content p {
        margin: 0 0 15px;
      }

      .btn {
        display: inline-block;
        background-color: #e60969;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
      }

      .footer {
        background-color: #212529;
        color: #fff3cd;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Notificación de nueva venta 🎉</h1>
    </div>
    <div class="content">
      <p>Te informamos que ${userName} ha realizado una nueva suscripción en el sitio web.</p>
      <p>Detalles de la venta:</p>
      <p>Galeria: ${galleryName}</p>
      <p>Artist: ${artist}</p>
      <p>Metodo : ${method}</p>
      <p>Precio : $ ${price} -</p>
    </div>
    <div class="footer">
      <p>My Artists Club</p>
    </div>
  </body>
</html>`;
};

module.exports = mailerNewSale;
