import { defineComponent, reactive, onUnmounted } from 'vue';
import Taro from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import type { BaseEventOrig, InputProps, } from '@tarojs/components';// eslint-disable-line no-duplicate-imports
// @ts-ignore
import styles from './styles.scss';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['change', 'update:visible'],
  setup(props, { emit }) {
    const nicknameTouchbarHeight = 64;

    const state = reactive({
      keyboardHeight: 0,
    });

    const onInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
      emit('change', e.detail.value);
      emit('update:visible', false);
    };

    const callback = ({ height }) => {
      state.keyboardHeight = height;
    };

    Taro.onKeyboardHeightChange(callback);
    onUnmounted(() => Taro.offKeyboardHeightChange(callback));

    return () => (
      <nut-popup v-model:visible={props.visible} className={styles.popup}>
        <View className={styles.container}>
          <View className={styles.abs} style={{ bottom: `${state.keyboardHeight + nicknameTouchbarHeight + 20}px` }}>
            <nut-animate type="float" loop>
              <View className={styles.main}>
                <View>点击下方一键输入微信名</View>
                <Image src="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/other/wggw/icon-robber-hand.png" />
              </View>
               </nut-animate>
          </View>
          {
            props.visible && <Input
              focus
              onInput={onInput}
              adjustPosition={false}
              className={styles.input}
              placeholderClass="placeholder-class"
              type='nickname'
              placeholder='点击选择填写微信昵称'
            />
          }
        </View>
      </nut-popup>
    );
  }
});
