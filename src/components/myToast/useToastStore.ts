/* eslint-disable no-undef */
import { reactive,ref } from 'vue';
import { defineStore } from 'pinia';
import successIcon from '@/assets/images/project/success.png';
import errorIcon from '@/assets/images/project/warring.png';

export interface IMyToastState  {
  id:string,
  visible: boolean,
  defaultduration:number,
  duration: number,
  title: string,
  icon: string,
  msg:string
}

export type Icons = 'success'|'error'

export interface IVariable  {
  title?: string,
  icon?: Icons,
  msg?:string,
  duration?:number,
}

export const useToastStore = defineStore('toast', () => {

  const state = reactive<IMyToastState[]>([]);

  const ICONS = {
    success:successIcon,
    error:errorIcon
  };

  const timeFlag = ref<any>(0);

  const addToast = (toastUUID:string)=>{
    state.push({
      id:toastUUID,
      visible: false,
      defaultduration:3500,
      duration: 3500,
      title: '',
      icon: '',
      msg:''
    });
  };
  const hideToast = (toastUUID:string,time)=> {
    clearTimeout(timeFlag.value);
    timeFlag.value =   setTimeout(()=>{
      const target = state.find(item=>item.id===toastUUID) as IMyToastState;
      target.visible = false;
      target.duration = target.defaultduration;
    },time);
  };

  const showToast = (toastUUID:string) => {
    const target = state.find(item=>item.id===toastUUID) as IMyToastState;
    target.visible = true;
    hideToast(target.id,target.duration);
  };

  const showToastByStore = (toastUUID:string,val:IVariable) => {
    const target = state.find(item=>item.id===toastUUID) as IMyToastState;
    target.icon = val.icon?ICONS[val.icon]:'';
    target.msg = val.msg||'';
    target.title = val.title||'';
    target.duration = val.duration||3500;
    target.visible = true;
    hideToast(target.id,target.duration);
  };

  return {
    state,
    ICONS,
    hideToast,
    showToast,
    showToastByStore,
    addToast
  };

});
