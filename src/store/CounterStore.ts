import { makeAutoObservable } from 'mobx';
import { fetchAddress } from '../request/requestAddress';
import { fetchCounter } from '../request/requestCounters';
import { fetchDelete } from '../request/requestDelete';
import { Counter } from '../type';

class CounterStore {
  counterList: Counter[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  addressMap: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  setCounterList(counters: Counter[]) {
    this.counterList = counters;
  }

  setTotalItems(count: number) {
    this.totalItems = count;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setAddressMap(map: Record<string, string>) {
    this.addressMap = { ...this.addressMap, ...map };
  }

  async fetchCounters(offset: number, limit: number) {
    try {
      const data = await fetchCounter(offset, limit);
      this.setCounterList(data.results);
      this.setTotalItems(data.count);

      const areaIds = data.results.map((counter) => counter.area.id);
      const addressData = await fetchAddress(areaIds);
      this.setAddressMap(addressData);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  async deleteCounter(meterId: string) {
    try {
      await fetchDelete(meterId);
      this.setCounterList(this.counterList.filter((counter) => counter.id !== meterId));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  }
}

const counterStore = new CounterStore();
export default counterStore;
