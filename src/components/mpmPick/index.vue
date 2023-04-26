<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <view :class="styles.mpmPick" class="mpmPick"  catch-move>
    <slot v-if="!!slots.content" name="content" />
    <view v-else class="picker" @click="handleShowPick">
      <view class="pickLab"> {{ props.lab }}： </view>
      <!-- :style="{backgroundColor: '#969799',opacity:0.4}" -->
      <view class="pickContent">
        <view>{{ pickChooseVal.text }}</view>
        <Iconfont v-show="!props.disabled" fill="#C9C9C9" size="12" class="next" name="icon-shouqi"></Iconfont>
      </view>
    </view>
    <!--  TODO 这个框架的取消事件无法触发？？  -->
    <root-portal> 
      <nut-popup v-model:visible="show"  position="bottom" :overlay="false">
      <nut-picker v-bind="$attrs"
      v-model:modelValue="chooseValList"
      v-model:visible="show" 
      :swipe-duration="0" :title="'请选择' + props.lab" class="my-pick"
        :columns="columns" @confirm="popupConfirm"  />
      </nut-popup>
    </root-portal>
  </view>
</template>

<script lang="ts" setup>
import { ref, useSlots, watch } from 'vue';
import styles from './styles.scss';
import { Picker as NutPicker } from '@nutui/nutui-taro';
import cloneDeep from 'lodash/cloneDeep';


interface IProps {
  lab: string
  disabled: boolean
  range: any[]
  rangeKey: string
  rangeIdKey: string
  pickChooseVal: any
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    lab: '',
    disabled: false,
    range: () => ([] as any),
    rangeKey: '',
    rangeIdKey: '',
    pickChooseVal: () => ({} as any)
  }
);
const emit = defineEmits(['update:pickChooseVal']);
const slots = useSlots();

const show = ref(false);
const pickChooseVal = ref<any>({});
const columns = ref<any[]>([]);
const chooseValList = ref<any[]>([]);

// 请注意 range 需要是 PickerOption类型的， 否则需要转换一下text类型  value类型
watch(() => props.range, () => {  
  columns.value = cloneDeep(props.range);
  // 初始化 text
  if (props.rangeKey) {
    columns.value.forEach(item => {
      item.text = item[props.rangeKey];
    });
  }
  // 初始化 listItem的value
  if (props.rangeIdKey) {
    columns.value.forEach(item => {
      item.value = item[props.rangeIdKey];
    });
  }  
},{immediate:true});


watch(()=>props.pickChooseVal,(newVal)=>{  
  pickChooseVal.value = cloneDeep(newVal);
  pickChooseVal.value.text = props.rangeKey?pickChooseVal.value[props.rangeKey]:pickChooseVal.value.text;
  pickChooseVal.value.value = props.rangeIdKey?pickChooseVal.value[props.rangeIdKey]:pickChooseVal.value.value;
  // 选取默认值
  chooseValList.value = [pickChooseVal.value[props.rangeIdKey]];
},{immediate:true,deep:true});

// TODO 这个框架的取消事件无法触发？？  这里采用手动触发
watch(()=>show.value,(newVal)=>{
if(!newVal){
  chooseValList.value = [pickChooseVal.value.value];
}
});

const popupConfirm = ({ selectedOptions }) => {
  pickChooseVal.value = selectedOptions[0];
  emit('update:pickChooseVal',pickChooseVal.value);
  show.value = false;
};

const handleShowPick = () => {
  if (props.disabled) return;
  show.value = true;
};



</script>
