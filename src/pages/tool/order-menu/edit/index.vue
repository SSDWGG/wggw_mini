<template>
  <scroll-view :class="styles.myContainer" scroll-y="true">
    <navbar title="编辑菜单" />
    <view class="headInfo">
      <view class="title"> 菜单列表 </view>
      <nut-collapse v-model="data.collapseVal" accordion>
        <nut-collapse-item v-for="fmenuItem in data.fmenuList" :key="fmenuItem.firstCdId" :name="fmenuItem.firstCdId">
          <template #title>主分类:{{ fmenuItem.firstCdName }} </template>
          <template #value>
            <nut-button class="delete" block type="danger" @tap="httpDeleteFmenu(fmenuItem.firstCdId)">删除</nut-button>
          </template>

          <nut-cell v-for="smenuItem in fmenuItem.smenu" :key="smenuItem.secondCdId" class="smenuItem">
            <view>
              {{ smenuItem.secondCdName }}
            </view>
            <view class="smenuItem2">
              <nut-button class="delete btns1" block type="danger" @tap="httpDeleteSmenu(smenuItem.secondCdId)">删除分类</nut-button>
              <nut-button class="delete" block @tap="httpAddCmenu(smenuItem.secondCdId)">上传菜品</nut-button>
            </view>
          </nut-cell>

          <nut-cell v-if="fmenuItem.smenu.length === 0" class="empty"> 暂未设置二级菜单，请先添加二级菜单 </nut-cell>
        </nut-collapse-item>
      </nut-collapse>

      <view class="btns">
        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="data.popShowFirstAdd = true">添加一级菜单</nut-button>
        </nut-animate>
        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="data.popShowSecondAdd = true">添加二级菜单</nut-button>
        </nut-animate>
      </view>
    </view>

    <update-pop
      v-model:modelValue="data.popShowFirstAdd"
      v-model:inputValue="data.popShowFirstAddiInputValue"
      title="添加一级菜单"
      placeholder="请输入一级菜单"
      :max="100"
      @ok="addFmenuData"
    />
    <update-pop
      v-model:modelValue="data.popShowSecondAdd"
      v-model:inputValue="data.popShowSecondAddiInputValue"
      title="添加二级级菜单"
      placeholder="请输入二级菜单"
      :max="100"
      :on-confirm="addSmenuData"
    >
      <template #contentBottom>
        <view
          class="chooseFmenu"
          @tap="
            () => {
              data.popShowFirst = true;
            }
          "
        >
          {{ !!data.pickValFirst.firstCdName ? `一级分类：${data.pickValFirst.firstCdName}` : '点击选择一级菜单' }}
        </view>
      </template>
    </update-pop>

    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .2)" :z-index="1" content="编辑菜单" />
    <nut-popup v-model:visible="data.popShowFirst" position="bottom">
      <nut-picker
        :field-names="{
          text: 'firstCdName',
          value: 'firstCdId',
        }"
        :columns="data.fmenuList"
        title="请选择一级菜单"
        @confirm="confirmFirst"
        @cancel="data.popShowFirst = false"
      />
    </nut-popup>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </scroll-view>
</template>
<script lang="ts" setup>
import { addFmenu, getFmenuList, deleteFmenu, addSmenu, getSmenuList, deleteSmenu } from '@/apis/orderMenu';
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';
import { ref, reactive, onMounted } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { useAccountStore } from '@/stores/account';
import type { IFmenuItem, ISmenuItem } from '@/apis/orderMenu/model';
import UpdatePop from '@/components/pop/updatePop/index.vue';

const account = useAccountStore();

const myToast = ref<any>();

const data = reactive({
  collapseVal: [],
  fmenuList: [] as IFmenuItem[],
  smenuList: [] as ISmenuItem[],
  pickValFirst: {} as IFmenuItem,
  pickValSecond: {} as ISmenuItem,
  popShowFirst: false,
  popShowSecond: false,
  popShowFirstAdd: false,
  popShowSecondAdd: false,
  popShowFirstAddiInputValue: '',
  popShowSecondAddiInputValue: '',
});

const confirmFirst = ({ selectedOptions }) => {
  data.pickValFirst = selectedOptions[0];
  data.popShowFirst = false;
};

// fmenu
const addFmenuData = async () => {
  await addFmenu({
    openid: account.userInfo.openid,
    firstCdName: data.popShowFirstAddiInputValue,
  });
  data.popShowFirstAddiInputValue = '';
  myToast.value.myToastShow({
    icon: 'success',
    title: '添加一级菜单成功',
    duration: 2000,
  });
  httpAllMenuList();
};

const httpAllMenuList = async () => {
  const resFmenu = await getFmenuList(account.userInfo.openid);
  const resSmenu = await getSmenuList(account.userInfo.openid);
  resFmenu.forEach((fmenuItem) => {
    fmenuItem.smenu = resSmenu
      .map((smenuItem) => {
        if (smenuItem.firstCdId === fmenuItem.firstCdId) {
          return smenuItem;
        }
        return undefined;
      })
      .filter((item) => !!item) as ISmenuItem[];
  });
  data.fmenuList = resFmenu;
};

const httpDeleteFmenu = async (firstCdId) => {
  await deleteFmenu(firstCdId);
  httpAllMenuList();
  myToast.value.myToastShow({
    icon: 'success',
    title: '删除一级菜单成功',
    duration: 2000,
  });
};

const httpDeleteSmenu = async (secondCdId) => {
  await deleteSmenu(secondCdId);
  httpAllMenuList();
  myToast.value.myToastShow({
    icon: 'success',
    title: '删除二级菜单成功',
    duration: 2000,
  });
};

// smenu

const addSmenuData = async (e) => {
  if (!data.pickValFirst.firstCdId) {
    myToast.value.myToastShow({
      icon: 'error',
      title: '一级菜单为必填项~',
      duration: 2000,
    });
  } else {
    await addSmenu({
      openid: account.userInfo.openid,
      secondCdName: e,
      firstCdId: data.pickValFirst.firstCdId,
    });
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data.pickValFirst = {} as IFmenuItem;
    data.popShowSecondAdd = false;
    data.popShowSecondAddiInputValue = '';
    httpAllMenuList();
  }
};

// cmenu

const httpAddCmenu = (secondCdId) => {
  console.log(secondCdId);
};

onMounted(async () => {
  await account.login();
  httpAllMenuList();
});
</script>
