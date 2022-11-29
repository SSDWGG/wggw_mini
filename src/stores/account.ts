import { defineStore } from 'pinia';

interface IState {
  showGuidePop:boolean,
  test:string
}

export const useAccountStore = defineStore('account', {
  state: (): IState => ({
    showGuidePop:true,
    test:''
  }),
  actions: {
  },
});
