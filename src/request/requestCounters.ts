import axios from 'axios';
import { CounterResponse } from '../type';

export const fetchCounter = async (offset: number, limit: number): Promise<CounterResponse> => {
  const response = await axios.get(
    `http://showroom.eis24.me/api/v4/test/meters/?limit=${limit}&offset=${offset}`
  );
  console.log(response.data);

  return response.data;
};
