<template>
  <scroll-view :class="styles.myContainer" scroll-y="true">
    <navbar title="编辑菜单" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .2)" :z-index="1" content="编辑菜单" />

    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import { addFmenu,getFmenuList,deleteFmenu } from '@/apis/orderMenu';
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';
import { ref, reactive, onMounted } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { useAccountStore } from '@/stores/account';
import type { IFmenuItem } from '@/apis/orderMenu/model';

const account = useAccountStore();



const myToast = ref<any>();

const data = reactive({
  fmenuList: [] as IFmenuItem[],
});

// fmenu
const addFmenuData = async () => {
  await addFmenu({
    openid: account.userInfo.openid,
    firstCdName: '蔬菜🥬',
  });

  myToast.value.myToastShow({
    icon: 'success',
    title: '添加一级菜单成功',
    duration: 2000,
  });
};

const httpFmenuList = async () => {
  const res = await getFmenuList(account.userInfo.openid);
  data.fmenuList = res;
  console.log(9999, res);
};

const httpDeleteFmenu = async () => {
   await deleteFmenu('1853691515386200066');
   myToast.value.myToastShow({
    icon: 'success',
    title: '删除一级菜单成功',
    duration: 2000,
  });
};
// smenu

onMounted(async() => {
  await account.login();
  httpFmenuList();
  // httpDeleteFmenu();
});
</script>
