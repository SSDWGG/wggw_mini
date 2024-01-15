/**
 * 分享按钮包装器，子元素不能是 button
 * 主要用于自定义 View, Image, Icon 分享
 *
 * 例如：
 * <ShareButton>
 *   <view>
 *     <image src="images/icon_share.png" />
 *     <text>分享</text>
 *   </view>
 * </ShareButton>
 *
 * 等同于
 * <button class="button-to-view" open-ype="share">
 *    <view>
 *     <image src="images/icon_share.png" />
 *     <text>分享</text>
 *   </view>
 * </button>
 *
 * 其他按钮分享（是button组件），添加 open-type="share" 即可
 * 例如：
 * <nut-button open-ype="share">分享</nut-button>
 *
 * **/

import { CSSProperties, SetupContext } from 'vue';
import { Button } from '@tarojs/components';

interface IProps {
  class?: string;
  style?: CSSProperties;
}

export default function ShareButton(props: IProps, { slots }: SetupContext) {
  return (
    <Button
      openType="share"
      class="button-to-view"
      style={props.style}
    >
      { slots.default?.() }
    </Button>
  );
}
