import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_IP;

export const getState = async () => {
  try {
    const get = await axios.get(URL);
    const { data } = get;
    return data;
  } catch (err) {
    return err;
  }
};
export const getGeolocalization = async (latitude, longitude) => {
  try {
    const get = await axios.get(`https://apis.datos.gob.ar/georef/api/ubicacion?lat=${latitude}&lon=${longitude}`);
    const data = get;
    return data;
  } catch (err) {
    return err;
  }
};
