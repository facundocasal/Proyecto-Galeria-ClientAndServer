import axios from 'axios';
import { GetLocalStorage } from '../helper/GetLocalStorage';

const token = GetLocalStorage('accessToken') || 'nada';
const urlbase = process.env.NEXT_PUBLIC_URL_BASE;
const clientAxios = axios.create({
  baseURL: urlbase,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accessToken: token,
  },
});

export default clientAxios;
