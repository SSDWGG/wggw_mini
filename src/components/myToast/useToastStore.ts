/* eslint-disable no-undef */
import { reactive,ref } from 'vue';
import { defineStore } from 'pinia';

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
    success:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FJDCGKIE-1670049121825right.png',
    error:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IBHDJHHP-1665451624450warring-icon.png'
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
