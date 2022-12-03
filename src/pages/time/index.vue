<template>
  <view :class="styles.myContainer">
    <navbar title="TIME" class="navbar" v-show="data.showNav" />

    <view class="progress">
      <!-- year progress -->
      <MyCircleProgress :content-title-text="`${dayjs().year()}-progress`" :end="startYear" :computedNum="31536000000"
        @tap="(data.showNav = !data.showNav)"
        :onAfterProgress="()=>handleAfter('hahah')"
        >
        <template v-slot:ContentSlot3="data">
          <view>
            {{ Math.abs(Number(data.slotdata.diff(dayjs(endYear), "day", true).toFixed(6))) }}Day
          </view>
        </template>
      </MyCircleProgress>

      <!-- day progress -->
      <MyCircleProgress format="MM-DD hh:mm" @tap="data.showNav = !data.showNav" :onAfterProgress="()=>handleAfter('hahah')"/>

      <!-- work progress -->
      <MyCircleProgress @tap="(data.showNav = !data.showNav)" content-title-text="WorkTimeProgress"
        :computed-num="32400000" :end="endWork" :onAfterProgress="()=>handleAfter('hahah')"
        >
        <template #ContentSlot1>
          <view>
            9:00-18:00
          </view>
        </template>
      </MyCircleProgress>
      <view class="pulldown" v-show="data.showNav">{{!!data.selfProgress.progressId?'show you progress ~':'create you progress now ~'}}</view>

    </view>
  </view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { Navbar } from "mini-ui";
import MyCircleProgress from "@/components/MyCircleProgress/index.vue";
import dayjs from "dayjs";
import { reactive } from "vue";
import { useAccountStore } from '@/stores/account';
import { IProgress } from "@/apis/progress/model";

const account = useAccountStore();

const startYear = dayjs(`${dayjs().year()}-12-31 23:59:59.999`)
const endYear = dayjs(`${dayjs().year() - 1}-12-31 23:59:59.999`)
const endWork = dayjs(`${dayjs().format("YYYY-MM-DD")} 17:59:59.999`)
const data = reactive({
  showNav: true,
  selfProgress:account.selfProgress  as IProgress,
});

const handleAfter = (msg:string)=>{
  console.log(msg);
}
</script>
