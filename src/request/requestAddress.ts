import axios from 'axios';

const addressCache: { [key: string]: string } = {};

export const fetchAddress = async (areaIds: string[]): Promise<{ [key: string]: string }> => {
  const idsToFetch = [...new Set(areaIds.filter((id) => !addressCache[id]))];

  if (idsToFetch.length === 0) {
    return addressCache;
  }

  try {
    const batchSize = 20;
    for (let i = 0; i < idsToFetch.length; i += batchSize) {
      const batchIds = idsToFetch.slice(i, i + batchSize).join(',');

      const response = await axios.get(`https://showroom.eis24.me/api/v4/test/areas/${areaIds}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          id__in: batchIds,
        },
      });

      const fetchedAddresses = response.data;

      fetchedAddresses.forEach(
        (address: { id: string; street: string; house: string; apartment: string }) => {
          addressCache[
            address.id
          ] = `${address.street}, д. ${address.house}, кв. ${address.apartment}`;
        }
      );
    }

    return addressCache;
  } catch (error) {
    console.log('Ошибка при получении адресов', error);
    return {};
  }
};
