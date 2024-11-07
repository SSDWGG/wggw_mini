<template>
  <view :class="styles.container">
    <!-- <navbar title="编辑菜谱" />
    <editor id="editor"
  showImgSize
  showImgToolbar showImgResize class="editor" :placeholder="data.placeholder" @ready="editorReady"></editor>
    <button type="warn" @tap="undo">撤销</button> -->
    <EditorField
		ref="editorField"
		:value="data.formData.content"
		prop="content"
		label="商品详情"
		placeholder="请输入商品详情1111"
		@fieldChange="fieldChangeHandle"
	/>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import { reactive } from 'vue';
import styles from './styles.scss';
import EditorField from './HgEditor.vue';
import Taro from '@tarojs/taro';


const data = reactive({
  placeholder: '来，输入隔壁的名字试试...',
  editorCtx: {} as any,
  formData: {
					id: '',
					content: ''
				}
});
const fieldChangeHandle =  (field, val)=> {
				data.formData[field] = val;
			};

// const editorReady = () => {
//   Taro.createSelectorQuery()
//     .select('#editor')
//     .context((res) => {
//       data.editorCtx = res.context;
//     })
//     .exec();
// };
// const undo = () => {
//   data.editorCtx.undo();
// };
</script>
