<template>
  <cover-view :class="styles.tabbar">
    <cover-view :class="styles.topBorder" />
    <cover-view :class="styles.container">
      <cover-view
        v-for="(item, index) in tabList"
        :key="index"
        :class="styles.item"
        @tap="switchTab(index, item.pagePath)"
      >
        <cover-image
        v-if="store.selected === index"
          :class="styles.icon"
          src="./tabbar/icon-tabbar-mine-active.png"
        />
        <cover-image
          v-else
          :class="styles.icon"
          src="./tabbar/icon-tabbar-mine.png"
        />
        <cover-view
          :class="styles.text"
          :style="{ color: store.selected === index ? selectedColor : color }"
        >
          {{ item.text }}
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view :class="styles.bottomArea" />
  </cover-view>
</template>
<script lang="ts" setup>
import { useTabBarStore, tabList } from './useTabBarStore';
import styles from './styles.scss';
import { useAccountStore } from '@/stores/account';


const color = '#747474';
const selectedColor = '#7468F2';
const store = useTabBarStore();
const account = useAccountStore();


const switchTab = (index, url) => {
  
  if (index === store.selected) return;

  account.getStorage(account.$state)

  store.setSelected(index);
  // Taro.switchTab({ url: `/${url}` });
};

</script>