<template>
  <!-- 普通样式三个时间表 -->
  <navbar title="TIME" background-color="transparent" v-show="data.showNav"  />
  <view :class="styles.myContainer" :style="{ height:data.showNav?normalHeight:'100vh' }">
    <view class="progress">
      <MyCircleProgress
        :content-title-text="`${dayjs().year()}-progress`"
        :end="startYear"
        :computedNum="31536000000"
        @tap="data.showNav = !data.showNav"
        :onAfterProgress="() => handleAfter('hahah')"
        :outEngineTime="data.nowTime"
      >
        <template v-slot:ContentSlot3="data">
          <view>
            {{
              Math.abs(
                Number(
                  data.slotdata.diff(dayjs(endYear), "day", true).toFixed(6)
                )
              )
            }}Day
          </view>
        </template>
      </MyCircleProgress>

      <MyCircleProgress
        @tap="data.showNav = !data.showNav"
        content-title-text="WorkTimeProgress"
        :computed-num="32400000"
        :end="endWork"
        :onAfterProgress="() => handleAfter('hahah')"
        :outEngineTime="data.nowTime"

      >
        <template #ContentSlot1>
          <view> 9:00-18:00 </view>
        </template>
      </MyCircleProgress>

      <MyCircleProgress
        format="MM-DD hh:mm"
        @tap="data.showNav = !data.showNav"
        :onAfterProgress="() => handleAfter('hahah')"
        :outEngineTime="data.nowTime"

      />
    </view>
  </view>

  <!-- 特殊时间表 -->
</template>
<script lang="ts" setup>
  import styles from "./styles.scss";
  import { Navbar } from '@fishui/taro-vue';
  import MyCircleProgress from "@/components/MyCircleProgress/index.vue";
  import dayjs from "dayjs";
  import { computed, reactive } from "vue";
import { useSystemInfoStore } from "@/stores/systemInfo";

  const systemInfo = useSystemInfoStore();


  const dayInfo = dayjs()
  const startYear = dayjs(`${dayInfo.year()}-12-31 23:59:59.999`);
  const endYear = dayjs(`${dayInfo.year() - 1}-12-31 23:59:59.999`);
  const endWork = dayjs(`${dayInfo.format("YYYY-MM-DD")} 17:59:59.999`);

  const data = reactive({
    showNav: true,
    nowTime: dayjs(),
    aeta: null as any,
  });

  const handleAfter = (msg: string) => {
    console.log(msg);
  };

  const normalHeight = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx  - env(safe-area-inset-bottom))`
);


  const timefun = () => {
  // 清除上一个 setTimeout
  clearTimeout(data.aeta);
  // 设置新的 setTimeout
  data.aeta = setTimeout(() => {
    // 获取当前时间
    data.nowTime = dayjs();
    // 递归调用 timefun
    timefun();
  }, 100);
};

timefun();

</script>
