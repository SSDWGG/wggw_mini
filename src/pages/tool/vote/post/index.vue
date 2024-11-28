<template>
  <view v-if="isPermissionsToWx()" :class="styles.voteContainer">
    <myNavBar title="创建投票" />
    <view class="container">
      <view class="nav">设置投票信息</view>
      <view class="personBox">
        <nut-form ref="ruleForm" :model-value="formData" class="userInfoForm">
          <nut-form-item
            label="投票名称"
            prop="title"
            :rules="[
              { required: true, message: '请输入本次投票的名称' },
              { validator: (val: string) => val.trim() !== '', message: '名称不能为空格' },
            ]"
          >
            <nut-input v-model="formData.title" style="padding-top: 0 !important" placeholder="请输入本次投票的名称" input-align="right" :border="false" />
          </nut-form-item>
          <nut-form-item
            label="投票介绍"
            prop="voteDesc"
            :rules="[
              { required: true, message: '请输入本次投票的介绍' },
              { validator: (val: string) => val.trim() !== '', message: '介绍不能为空格' },
            ]"
          >
            <nut-input
              v-model="formData.voteDesc"
              style="padding-top: 0 !important"
              placeholder="请输入本次投票的介绍"
              input-align="right"
              :border="false"
            />
          </nut-form-item>
          <nut-form-item
            label="投票选项"
            prop="chooseMap"
            :rules="[
              { required: true, message: '请输入投票选项' },
              { validator: (val: string) => val.trim() !== '', message: '选项不能为空格' },
            ]"
          >
            <nut-input
              v-model="formData.chooseMap"
              style="padding-top: 0 !important"
              placeholder="选项使用+隔离，如：‘对+错’"
              input-align="right"
              :border="false"
            />
          </nut-form-item>
          <nut-form-item label="投票类型" prop="voteType" :rules="[{ required: true, message: '请选择投票类型' }]">
            <view class="flex-row flex.justify-end" @tap="data.pickShow = true">
              <span class="text-group_1">{{ formData.voteType === 1 ? '指定时间投票截止' : '指定投票数量截止' }}</span>
              <image class="thumbnail_4" referrerpolicy="no-referrer" src="@/assets/images/project/arrow.png" />
            </view>
          </nut-form-item>
          <nut-form-item v-if="formData.voteType === 1" label="开票时间" prop="voteDdl" :rules="[{ required: true, message: '请选择开票时间' }]">
            <nut-input
              v-model="formData.voteDdl"
              style="padding-top: 0 !important"
              placeholder="请选择开票时间"
              input-align="right"
              :border="false"
            />
          </nut-form-item>
          <nut-form-item v-else label="参与人数" prop="voteMaxNum" :rules="[{ required: true, message: '请输入参与人数' }]">
            <nut-input
              v-model="formData.voteMaxNum"
              type="number"
              style="padding-top: 0 !important"
              placeholder="请输入参与人数"
              input-align="right"
              :border="false"
            />
          </nut-form-item>

        </nut-form>
      </view>

      <view class="btn-box">
        <nut-button block type="primary" class="btn" @tap="handleAddAlbum">发布</nut-button>
      </view>
    </view>
    <!-- 预览列表(图片、视频，添加按钮) -->
    <prelist ref="prelistRef" />
  </view>

  <view v-else :class="styles.emptyContainer">
    <myNavBar title="感谢关注" />
    <view class="empty"> 感谢您的关注，该功能暂未开启 </view>
  </view>

  <nut-popup v-model:visible="data.pickShow" position="bottom">
    <nut-picker :columns="data.pickColumns" title="请选择券类型" @confirm="confirm" @cancel="data.pickShow = false" />
  </nut-popup>

   <!-- toast提示 -->
   <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro, { useDidShow } from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import Prelist from '@/components/postPreList/index.vue';
import { debounce } from 'lodash';
import { useAccountStore } from '@/stores/account';
import { isPermissionsToWx } from '@/utils/index';
import { addVote } from '@/apis/vote';
import dayjs from 'dayjs';
import myToastComponents from '@/components/myToast/index.vue';

definePageConfig({
  disableScroll: true,
});

const myToast = ref<any>();

const account = useAccountStore();

const ruleForm = ref<any>(null);

const formData = ref({
  voteDesc: '',
  title: '',
  chooseMap: '',
  voteType: 0,
  // 最大投票数默认5人
  voteMaxNum: 5,
  // 投票截止时间默认 一天后
  voteDdl: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
});

const data = reactive({
  pickShow: false,
  pickColumns: [
    // { text: '指定时间投票截止', value: 1 },
    { text: '指定投票数量截止', value: 0 },
  ],
});
const prelistRef = ref();

const PasslintContent = () => {
  const resList = formData.value.chooseMap.match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g);
  if (prelistRef.value.data.sortedList.length === 0) {
    myToast.value.myToastShow({
      title: '请上传本次投票图片',
      icon: 'error',
      duration: 2500,
    });
    return false;
  } else if (!resList) {
    myToast.value.myToastShow({
      title: '投票选项输入错误，本次未解析到符合规则的选项，请将不同的选项使用+隔离',
      icon: 'error',
      duration: 2500,
    });
    return false;
  }else if (resList.length <2 ) {
    myToast.value.myToastShow({
      title: `投票选项输入错误，本次解析到选项：${resList.join(',')}`,
      icon: 'error',
      duration: 2500,
    });
    return false;
  } else {
    return true;
  }
};

const confirm = ({ selectedOptions }) => {
  formData.value.voteType = selectedOptions[0].value;
  data.pickShow = false;
};

const addMemoData = async (
  List: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[],
) => {
  const targetList: {
    picUrl: string;
  }[] = [];

  // 数据格式化存储的内容
  List.forEach((item) => {
    targetList.push({
      picUrl: item.fullpath as string,
    });
  });

  const voteId = await addVote({
    imgSrc: JSON.stringify(targetList),
    openid: account.userInfo.openid,
    ...formData.value,
  } as any);
  console.log(voteId);
};

const postHttp = debounce(async () => {
  try {
    await addMemoData(await prelistRef.value.uploadOSS());
    Taro.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  } catch (error) {
    Taro.showToast({
      title: '上传失败',
      icon: 'error',
      duration: 2000,
    });
  }
}, 500);

const handleAddAlbum = () => {
  ruleForm.value.validate().then(({ valid }: any) => {
    // 通过校验
    if (valid) {
      // 校验
      if (!PasslintContent()) return false;
      Taro.showLoading({
        title: '上传中',
        mask: true,
      });
      postHttp();
    } else {
      // todo:校验失败提醒
    }
  });
};

useDidShow(() => {
  account.login();
});
</script>
