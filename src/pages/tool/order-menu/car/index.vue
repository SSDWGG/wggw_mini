<template>
  <view :class="styles.classify">
    <!-- 顶部导航 -->
    <myNavBar background-color="transparent">
      <template #left>
        <view class="leftContent">
          <image class="logoImg" src="@/assets/images/project/rabbit.png" mode="widthFix" />
          <view class="leftTitle">
            <view class="cName"> 菜品列表 </view>
            <view class="YName"> caipingliebiao </view>
          </view>
        </view>
      </template>
      <template #title> </template>
    </myNavBar>

    <view class="mainContent">
      <!-- 购物车商品 -->
      <view v-if="data.cartList.length>0" class="cartList">
        <view v-for="item in data.cartList" :key="item" class="cartItem"> {{ item }} </view>
      </view>
      <nut-empty v-else description="快去添加菜品吧~"></nut-empty>

      <!-- 底部结算栏 -->
      <my-footer :allNum="1" :allPrice="2" :showFlags="[1]"> </my-footer>
    </view>
  </view>
</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import myNavBar from '@/components/my-nav-bar/index.vue';
import myFooter from '@/components/my-footer/index.vue';
import { reactive } from 'vue';

const data = reactive({
  cartList: [],
});
</script>
