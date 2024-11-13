<template>
  <scroll-view :class="styles.myContainer" scroll-y="true">
    <navbar title="编辑菜单" />
    <view class="headInfo">
      <view class="title"> 菜单列表 </view>
      <nut-collapse accordion>
        <nut-collapse-item v-for="fmenuItem in data.fmenuList" :key="fmenuItem.firstCdId" :name="fmenuItem.firstCdId">
          <template #title>主分类:{{ fmenuItem.firstCdName }} </template>
          <template #value>
            <view class="fbtns">
              <nut-button class="fbtnItem" block type="danger" @tap="httpDeleteFmenu(fmenuItem.firstCdId)">删除</nut-button>
              <nut-button class="fbtnItem" block @tap="httpEditFmenu(fmenuItem)">编辑</nut-button>
            </view>
          </template>

          <!-- 二级菜单 -->
          <nut-collapse accordion>
            <nut-collapse-item v-for="smenuItem in fmenuItem.smenu" :key="smenuItem.secondCdId" :name="smenuItem.secondCdId" class="smenuItemContent">
              <template #title>
                <view class="smenuItem">
                  <view>
                    {{ smenuItem.secondCdName }}
                  </view>
                  <view class="smenuItemBtns">
                    <nut-button class="smenuItemBtnItem" block @tap="httpEditSmenu(smenuItem)">编辑</nut-button>
                    <nut-button class="smenuItemBtnItem" block type="danger" @tap="httpDeleteSmenu(smenuItem.secondCdId)">删除</nut-button>
                    <nut-button class="smenuItemBtnItem" block @tap="httpAddCmenu(smenuItem.secondCdId)">上传</nut-button>
                  </view>
                </view>
              </template>

              <!-- 详细菜单 -->
              <view class="cmenuList">
                <view v-for="(cmenuItem, cmenuIndex) in smenuItem.cmenu" :key="cmenuIndex" class="cmenuItem">
                  <view> {{ cmenuItem.catName }} </view>
                  <view class="cmenuItemBtns">
                    <nut-button class="cmenuItemBtnItem" block type="danger" @tap="httpDeleteCmenu(cmenuItem.cCdId)">删除</nut-button>
                  </view>
                </view>
              </view>
            </nut-collapse-item>
          </nut-collapse>

          <nut-cell v-if="fmenuItem.smenu.length === 0" class="empty"> 暂未设置二级菜单，请先添加二级菜单 </nut-cell>
        </nut-collapse-item>
      </nut-collapse>

      <view class="buttomBtns">
        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="data.popShowFirstAdd = true">添加一级菜单</nut-button>
        </nut-animate>
        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="data.popShowSecondAdd = true">添加二级菜单</nut-button>
        </nut-animate>
      </view>
    </view>

    <!-- 新建一级菜单 -->
    <update-pop
      v-model:modelValue="data.popShowFirstAdd"
      v-model:inputValue="data.popShowFirstAddiInputValue"
      title="添加一级菜单"
      placeholder="请输入一级菜单"
      :max="100"
      @ok="addFmenuData"
    />
    <!-- 修改一级菜单 -->
    <update-pop
      v-model:modelValue="data.popShowFirstAddEdit"
      v-model:inputValue="data.editFirstVal"
      title="修改一级菜单"
      placeholder="请输入一级菜单"
      :max="100"
      @ok="editFmenuDataOk"
    />
    <!-- 新建修改二级菜单 -->
    <update-pop
      v-model:modelValue="data.popShowSecondAdd"
      v-model:inputValue="data.popShowSecondAddInputValue"
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
    <!-- 修改二级菜单 -->
    <update-pop
      v-model:modelValue="data.popShowSecondAddEdit"
      v-model:inputValue="data.editSecondVal"
      title="修改二级级菜单"
      placeholder="请输入二级菜单"
      :max="100"
      :on-confirm="editSmenuData"
    >
      <template #contentBottom>
        <view
          class="chooseFmenu"
          @tap="
            () => {
              data.popShowFirstEdit = true;
            }
          "
        >
          {{ !!data.editSecondObj.firstCdName ? `一级分类：${data.editSecondObj.firstCdName}` : '点击选择一级菜单' }}
        </view>
      </template>
    </update-pop>
    <!-- 二级菜单内选择一级菜单（编辑） -->
    <nut-popup v-model:visible="data.popShowFirstEdit" position="bottom">
      <nut-picker
        :field-names="{
          text: 'firstCdName',
          value: 'firstCdId',
        }"
        :columns="data.fmenuList"
        title="请选择一级菜单"
        @confirm="confirmFirstEdit"
        @cancel="data.popShowFirstEdit = false"
      />
    </nut-popup>
    <!-- 水印 -->
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .2)" :z-index="1" content="编辑菜单" />

    <!-- 二级菜单内选择一级菜单（新增） -->
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
import { addFmenu, getFmenuList, deleteFmenu, addSmenu, getSmenuList, deleteSmenu, updateFmenu, updateSmenu, getCmenuList, deleteCmenu } from '@/apis/orderMenu';
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';
import { ref, reactive } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { useAccountStore } from '@/stores/account';
import type { IFmenuItem, ISmenuItem } from '@/apis/orderMenu/model';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import Taro, { useDidShow } from '@tarojs/taro';

const account = useAccountStore();

const myToast = ref<any>();

const data = reactive({
  fmenuList: [] as IFmenuItem[],
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  pickValFirst: {} as IFmenuItem,
  popShowFirst: false,
  popShowFirstAdd: false,
  popShowFirstAddEdit: false,
  editFirstVal: '',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  editFirstObj: {} as IFmenuItem,
  popShowFirstAddiInputValue: '',

  popShowFirstEdit: false,
  smenuList: [] as ISmenuItem[],
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  pickValSecond: {} as ISmenuItem,
  popShowSecondAddEdit: false,
  popShowSecond: false,
  popShowSecondAdd: false,
  popShowSecondAddInputValue: '',
  editSecondVal: '',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  editSecondObj: {} as ISmenuItem,
});

const confirmFirst = ({ selectedOptions }) => {
  data.pickValFirst = selectedOptions[0];
  data.popShowFirst = false;
};
const confirmFirstEdit = ({ selectedOptions }) => {
  data.editSecondObj.firstCdId = selectedOptions[0].firstCdId;
  data.editSecondObj.firstCdName = selectedOptions[0].firstCdName;
  data.popShowFirstEdit = false;
};

// fmenu

// 查
const httpAllMenuList = async () => {
  const resFmenu = await getFmenuList(account.userInfo.openid);
  const resSmenu = await getSmenuList(account.userInfo.openid);
  const resCmenu = await getCmenuList(account.userInfo.openid);

  resFmenu.forEach((fmenuItem) => {
    fmenuItem.smenu = resSmenu
      .map((smenuItem) => {
        smenuItem.cmenu = resCmenu
          .map((cItem) => {
            if (cItem.secondCdId === smenuItem.secondCdId) {
              return cItem;
            }
          })
          .filter((item) => !!item);

        if (smenuItem.firstCdId === fmenuItem.firstCdId) {
          return smenuItem;
        }
        return undefined;
      })
      .filter((item) => !!item) as ISmenuItem[];
  });
  console.log(resFmenu);

  data.fmenuList = resFmenu;
};
// 增
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
// 改
const editFmenuDataOk = async (val) => {
  data.editFirstObj.firstCdName = val;
  await updateFmenu(data.editFirstObj);
  myToast.value.myToastShow({
    icon: 'success',
    title: '修改一级菜单成功',
    duration: 2000,
  });
  httpAllMenuList();
};
// 删
const httpDeleteFmenu = async (firstCdId) => {
  await deleteFmenu(firstCdId);
  httpAllMenuList();
  myToast.value.myToastShow({
    icon: 'success',
    title: '删除一级菜单成功',
    duration: 2000,
  });
};

const httpEditFmenu = (fmenuItem: IFmenuItem) => {
  data.editFirstVal = fmenuItem.firstCdName;
  data.editFirstObj = fmenuItem;
  data.popShowFirstAddEdit = true;
};

// smenu
// 删
const httpDeleteSmenu = async (secondCdId) => {
  await deleteSmenu(secondCdId);
  httpAllMenuList();
  myToast.value.myToastShow({
    icon: 'success',
    title: '删除二级菜单成功',
    duration: 2000,
  });
};
// 增
const addSmenuData = async (secondCdName) => {
  if (!data.pickValFirst.firstCdId) {
    myToast.value.myToastShow({
      icon: 'error',
      title: '一级菜单为必填项~',
      duration: 2000,
    });
  } else {
    await addSmenu({
      openid: account.userInfo.openid,
      secondCdName: secondCdName,
      firstCdId: data.pickValFirst.firstCdId,
      firstCdName: data.pickValFirst.firstCdName,
    });
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data.pickValFirst = {} as IFmenuItem;
    data.popShowSecondAdd = false;
    data.popShowSecondAddInputValue = '';
    httpAllMenuList();
  }
};
// 改
const editSmenuData = async (secondCdName) => {
  if (!data.editSecondObj.firstCdId) {
    myToast.value.myToastShow({
      icon: 'error',
      title: '一级菜单为必填项~',
      duration: 2000,
    });
  } else {
    data.editSecondObj.secondCdName = secondCdName;
    await updateSmenu(data.editSecondObj);
    data.popShowSecondAddEdit = false;
    httpAllMenuList();
  }
};

const httpEditSmenu = (smenuItem: ISmenuItem) => {
  data.editSecondVal = smenuItem.secondCdName;
  data.editSecondObj = smenuItem;
  data.popShowSecondAddEdit = true;
};

// cmenu

const httpAddCmenu = (secondCdId) => {
  Taro.navigateTo({
    url: `/pages/tool/order-menu/post/index?type=image&secondCdId=${secondCdId}`,
  });
};

const httpDeleteCmenu = async (cCdId) => {
  await deleteCmenu(cCdId);
  httpAllMenuList();
  myToast.value.myToastShow({
    icon: 'success',
    title: '删除菜品成功',
    duration: 2000,
  });
};

useDidShow(async () => {
  await account.login();
  httpAllMenuList();
});
</script>
