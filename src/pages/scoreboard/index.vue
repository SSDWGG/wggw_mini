<template>
  <navbar title="计分板" background-color="#f3f3fe" />
  <view :class="styles.scoreboard">
    <nut-table
      :columns="pageData.columns"
      :data="pageData.tableData"
      :bordered="false"
      striped
    >
      <template #nodata>
        <view class="no-data"> 暂无数据，开始比赛吧~ </view>
      </template></nut-table
    >

    <view class="btnGroup">
      <!-- 发表按钮 -->
      <nut-animate
        type="breath"
        class="rule-button-div"
        loop
        v-if="pageData.tableData.length > 0"
      >
        <nut-button
          block
          type="primary"
          class="publish"
          @tap="pageData.startGame = true"
          >开启下一轮计分</nut-button
        >
      </nut-animate>
      <!-- 添加参赛人员 -->
      <nut-animate type="breath" class="rule-button-div" loop>
        <nut-button
          block
          type="primary"
          class="publish"
          @tap="pageData.addPerson = true"
          >添加参赛人员</nut-button
        >
      </nut-animate>
    </view>
    <update-pop
      v-model:modelValue="pageData.startGame"
      v-model:inputValue="pageData.gameStr"
      title="添加本场比赛结果"
      placeholder="添加本场比赛结果"
      @ok="handleOkGame"
      :max="1000"
    >
      <template #contentBottom>
        <view class="popTip">
          <view class="txt">(批量添加请使用+作为间隔)</view>
        </view>
      </template></update-pop
    >

    <update-pop
      v-model:modelValue="pageData.addPerson"
      v-model:inputValue="pageData.personStr"
      title="添加比赛参与人员"
      placeholder="添加比赛参与人员"
      @ok="handleOkPerson"
      :max="1000"
    >
      <template #contentBottom>
        <view class="popTip">
          <view class="txt">(批量添加请使用+作为间隔)</view>
        </view>
      </template>
    </update-pop>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
  import styles from "./styles.scss";
  import { Navbar } from "@fishui/taro-vue";
  // import {
  //   Table as NutTable,
  //   Animate as NutAnimate,
  //   Button as NutButton,
  // } from "@nutui/nutui-taro";
  import { reactive, h, computed, ref } from "vue";
  import myToastComponents from "@/components/myToast/index.vue";
  import UpdatePop from "@/components/pop/updatePop/index.vue";

  definePageConfig({ backgroundColor: "#f3f3fe" });

  const myToast = ref<any>();

  const pageData = reactive({
    manySave: false,
    startGame: false,
    addPerson: false,
    gameStr: "",
    personStr: "",
    columns: [
      {
        title: "姓名",
        key: "name",
        align: "center",
        stylehead: "font-size:20px;color:#7468F2;font-weight:bolder;",
        stylecolumn: "font-size:20px;color:#7468F2;",
      },
      {
        title: "历史得分",
        key: "step",
        align: "center",
        stylehead: "font-size:20px;color:#7468F2;font-weight:bolder;",
        stylecolumn: "font-size:20px;color:#7468F2;",
        render: (record) => {
          return h(
            "span",
            record.step.length > 0
              ? `${record.step.length > 3 ? "..." : ""}${record.step
                  .join("+")
                  .slice(-5)}`
              : 0
          );
        },
      },
      {
        title: "总得分",
        key: "all",
        align: "center",
        stylehead: "font-size:20px;color:#7468F2;font-weight:bolder;",
        stylecolumn: "font-size:20px;color:#7468F2;",
        render: (record) => {
          return h(
            "span",
            record.step.reduce((pre, cur) => Number(pre) + Number(cur), 0)
          );
        },
        sorter: (row1: any, row2: any) => {
          return row2.all - row1.all;
        },
      },
    ],
    tableData: [] as any[],
  });

  const fixAllData = () => {
    pageData.tableData.forEach((item) => {
      item.all = computed(() =>
        item.step.reduce((pre, cur) => Number(pre) + Number(cur), 0)
      );
    });
  };

  const handleOkGame = () => {
    // 校验人数和拆分后的数字是否合适匹配
    const resList = pageData.gameStr.match(/\d+(\.\d+)?/g);
    if (!!resList && resList.length === pageData.tableData.length) {
      resList.forEach((item, index) => {
        pageData.tableData[index].step.push(item);
      });
      fixAllData();
      pageData.gameStr = "";
    } else {
      myToast.value.myToastShow({
        icon: "error",
        title: `当前参赛人${pageData.tableData.length}个，本次输入数据${
          !!resList ? resList.length : 0
        }个，请检查！`,
        duration: 3000,
      });
    }
  };
  const handleOkPerson = () => {
    if (!pageData.personStr) {
      myToast.value.myToastShow({
        icon: "error",
        title: "请输入参赛人",
        duration: 2000,
      });
    }
    
    pageData.personStr.split("+").forEach((item) => {
      pageData.tableData.push({
        name: item,
        step: [],
        all: null,
      });
    });

    fixAllData();
    pageData.personStr = "";
  };
</script>
