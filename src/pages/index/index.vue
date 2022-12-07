<template>
  <view>
    <!-- <view>此页面作初始化跳转页面，可以放 loading or logo</view> -->
  </view>
</template>

<script lang="ts" setup>
import { switchTab, useLoad, useRouter } from '@tarojs/taro';
import { adjustSelected } from '../../custom-tab-bar/useTabBarStore';
import { useAccountStore } from '@/stores/account';
import { uuid } from '@/utils/index';

const account = useAccountStore();

// 初始化同步历史数据store
account.getStorage(account.$state)

// 创建初始uuid
if(account.uuid==="0"){
  account.uuid = uuid()
  account.setStorage(account.$state)
}




const router = useRouter();
const homePage = router.params.tabbar || '/pages/menu/index';

// @ts-ignore
useLoad((options: any) => {
  switchTab({ url: homePage, success: () => adjustSelected(homePage) });
});
</script>
