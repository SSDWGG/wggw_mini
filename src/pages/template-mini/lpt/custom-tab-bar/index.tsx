import { defineComponent } from 'vue';
import Taro from '@tarojs/taro';
import { View, Image, Block } from '@tarojs/components';
import HomeModal from '@/components/homeModal';
import { useTabBarStore } from './useTabBarStore';
// @ts-ignore
import styles from './styles.scss';


const color = '#747474';
const selectedColor = '#7468F2';

export default defineComponent({
  options: {
    addGlobalClass: true,
  },
  setup() {
    const store = useTabBarStore();
    store.watchIdentity(); // 多个 tabbar 组件实例 只监听一次

    const switchTab = (index, url) => {
      if (index === store.selected) return;
      store.setSelected(index);
      Taro.navigateTo({ url: `/${url}` });
    };

    const renderItem = (item: Taro.TabBarItem, index: number) => (
      <View key={index} className={styles.item} onTap={() => switchTab(index, item.pagePath)}>
        <Image
          className={styles.icon}
          src={(store.selected === index ? item.selectedIconPath : item.iconPath)!}
        />
          <View
            className={styles.text}
            style={{ color: store.selected === index ? selectedColor : color }}
          >
            { item.text }
          </View>
      </View>
    );

    return () => (
      <Block>
        <HomeModal />
        <View v-show={store.visible} className={`${styles.tabbar} visible-${store.visible}`}>
          <View className={styles.topBorder} />
          <View className={styles.container}>
            {store.tabList.map(renderItem)}
          </View>
          <View className={styles.bottomArea} />
        </View>
      </Block>
    );
  }
});
