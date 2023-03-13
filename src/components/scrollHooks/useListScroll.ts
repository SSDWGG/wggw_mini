import { ref } from 'vue';

export const useListScroll = (time = 1000) => {
  let timer: any = null;
  const show = ref<boolean>(true);

  const onScroll = () => {
    if (timer) clearTimeout(timer);
    show.value = false;
    timer = setTimeout(() => {
      show.value = true;
      timer = null;
    }, time);
  };

  return {
    show,
    onScroll,
  };
};