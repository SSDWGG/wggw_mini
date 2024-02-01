import { defineComponent, reactive, watch, toRef, PropType } from 'vue';
import { debounce } from 'lodash';
import { useReady, NodesRef } from '@tarojs/taro';
import { ScrollView, View, Text, BaseEventOrig } from '@tarojs/components';
import { Loading } from '@nutui/icons-vue-taro';
import { querySelector } from '@/utils/index';
import './styles.global.scss';

type IAsyncFunction = () => Promise<any>;
type IFunction = () => void;
type IRequest = IAsyncFunction | IFunction;

const dummyRequest = (ms?: number) => new Promise(resolve => { setTimeout(resolve, typeof ms === 'number' ? ms : 1000) });
let __ID__ = 0;

export default defineComponent({
  props: {
    threshold: {
      type: Number,  // 距底部（单位px），触发 loadmore 事件
      default: 60,
    },
    refreshEnabled: {
      type: Boolean, // 开启下拉刷新
      default: true,
    },
    refresherBackground: {
      type: String,
      default: '#FFF',
    },
    isRefreshing: {
      type: Boolean, // 下拉刷新中...
      default: false,
    },
    hasMore: {
      type: Boolean, // 是否还有更多数据
      required: true,
    },
    loadMoreText: {
      type: String, // “没有更多数”据展示文案
      default: '哎呀，这里是底部啦',
    },
    isEmpty: {
      type: Boolean,
      required: true,
    },
    emptyImage: {
      type: String,
      default: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yeb/pc/2022-09-13/%E7%BC%96%E7%BB%84%205%402x_-_91c884ac-8460-4d0d-a850-4837f875d1ca.png',
    },
    emptyImageSize: {
      type: [String, Number],
      default: 174,
    },
    emptyDescription: {
      type: String,
      default: '暂无数据',
    },
    refresh: {
      type: Function as PropType<IRequest>,
      default: dummyRequest,
    },
    loadmore: {
      type: Function as PropType<IRequest>,
      required: true,
    },
    refresherThreshold: {
      type: Number,
      default: 60,
    },
    needFooter: {
      type: Boolean,
      default: true,
    },
    canScroll: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['scroll'],
  setup(props, { slots, emit }) {
    const thisID = `mpm-scroll-list-${++__ID__}`;
    let thisHeight = 0;

    const state = reactive<{
      refreshStatus: 0|1|2|3;
      isLoading: boolean;
    }>({
      /**
       * 0: default waiting pull “下拉刷新”
       * 1: 达到下拉刷新阈值  “松手更新”
       * 2: is refreshing "刷新加载中"
      */
      refreshStatus: 0,
      isLoading: false,
    });

    watch(toRef(props, 'isRefreshing'), () => {
      state.refreshStatus = props.isRefreshing ? 2 : 0;
    });

    watch(toRef(props, 'hasMore'), (hasmore) => {
      if (!hasmore) state.isLoading = false;
    });

    const onScrollToLower = async () => {
      if (!props.hasMore) return;
      if (state.isLoading) return;
      state.isLoading = true;
      await props.loadmore();
      state.isLoading = false;
    };

    const onRefresherPulling = (e: BaseEventOrig<{ dy: number }>) => {
      if (state.refreshStatus > 1) return;
      const status = e.detail.dy > props.refresherThreshold ? 1 : 0;
      if (state.refreshStatus !== status) {
        state.refreshStatus = status;
      }
    };

    const onRefresherRefresh = async () => {
      if (state.refreshStatus === 2) return;
      state.refreshStatus = 2;
      await Promise.all([props.refresh(), dummyRequest(1000)]);
      state.refreshStatus = 3;
    };

    const onRefresherRestore = () => {
      state.refreshStatus = 0;
    };

    const onRefresherAbort = () => {
      state.refreshStatus = 0;
    };

    useReady(() => setTimeout(() => {
      querySelector(`#${thisID}`, { size: true }).then((res: NodesRef.BoundingClientRectCallbackResult) => {
        thisHeight = res.height;
      }).catch((error) => console.error('ScrollList ready error', error));
    }, 200));

    const onScroll = debounce(({ detail: { scrollTop, scrollHeight } }) => {
      /**
       * onScrollToLower 的触发条件为 scrollTop + thisHeight + props.threshold >= scrollHeight
       * onScroll 监听的上面的条件不成立 也无法 触发 onScrollToLower，
       * 滑动过快 或页面列表原素 高度还没渲染出来，导致原生有此bug
       * 这里我们 增加一个 larger threshold 去判断 是否出现此情况
       *
      */
      if (thisHeight === 0) return;
      const largerThreshold = thisHeight * 3 / 4; // 距离底部距离 列表的 3/4
      const originScrollHeight = scrollTop + thisHeight + props.threshold;
      const largerScrollHeight = scrollTop + thisHeight + largerThreshold;
      if (largerScrollHeight >= scrollHeight && originScrollHeight < scrollHeight) {
        onScrollToLower();
      }
    }, 800);

    const _onScroll = (e) => {
      emit('scroll', e);
      onScroll(e);
    };

    return () => (
      <ScrollView
        className="mpm-scroll-view"
        id={thisID}
        refresherDefaultStyle="none"
        scrollX={false}
        scrollY={props.canScroll}
        lowerThreshold={props.threshold}
        scrollWithAnimation
        enableFlex
        scrollAnchoring
        refresherEnabled
        refresherThreshold={props.refresherThreshold}
        refresherBackground={props.refresherBackground}
        refresherTriggered={state.refreshStatus === 2}
        onScrolltolower={onScrollToLower}
        onRefresherpulling={onRefresherPulling}
        onRefresherrefresh={onRefresherRefresh}
        onRefresherrestore={onRefresherRestore}
        onRefresherabort={onRefresherAbort}
        onScroll={_onScroll}
      >
        {
          props.refreshEnabled && (
            !slots.refresher ? (
              <View
                className={`mpm-scroll-view-refresher ${state.refreshStatus === 2 ? '' : 'unset'}`}
                style={{ backgroundColor: props.refresherBackground, height: `${props.refresherThreshold}px`, top: `${-props.refresherThreshold}px` }}
              >
                <Loading size="18" />
                <Text>{ state.refreshStatus === 0 ? '下拉刷新' : (state.refreshStatus === 1 ? '松手刷新' : '加载中...')}</Text>
              </View>
            ) : slots.refresher()
          )
        }
        {slots.default?.()}
        {
          (!props.hasMore && props.isEmpty && state.refreshStatus < 2) && <nut-empty
            image={props.emptyImage}
            imageSize={props.emptyImageSize}
            description={props.emptyDescription}
          />
        }
        {
          !slots.loadMoreLoading ? (
            <View className="mpm-scroll-view-footer float" style={{
              backgroundColor: props.refresherBackground,
              display: props.hasMore || state.isLoading ? 'flex' : 'none'
            }}>
                <Loading size="18" />
              <Text>数据加载中</Text>
            </View>
          ) : slots.loadMoreLoading()
        }
        {
          (!props.hasMore && !props.isEmpty&&props.needFooter) && (
            <View className="mpm-scroll-view-footer" style={{ backgroundColor: props.refresherBackground }}>
              {props.loadMoreText}
            </View>
          )
        }
      </ScrollView>
    );
  }
});
