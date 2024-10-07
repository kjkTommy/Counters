import axios from 'axios';

const url = 'http://showroom.eis24.me/api/v4/test/meters/:meterId/';

export const fetchDelete = async (meterId: string): Promise<void> => {
  try {
    await axios.delete(url.replace(':meterId', meterId), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Ошибка при удалении:', error);
  }
};
