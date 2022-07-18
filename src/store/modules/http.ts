import { defineStore } from 'pinia';
import { store } from '/@/store';

export const useHttpStore = defineStore({
  id: 'http',
  state: () => ({
    httpInfo: { has401: false, has500: false },
  }),
  getters: {
    getHttpInfo(): Recordable {
      return this.httpInfo;
    },
  },
  actions: {
    setHttpInfo(httpInfo) {
      this.httpInfo = Object.assign({}, this.httpInfo, httpInfo);
      // Persistent.setLocal(CROPPER_INFO_KEY, this.httpInfo, true);
    },
  },
});

export function useHttpStoreWithOut() {
  return useHttpStore(store);
}
