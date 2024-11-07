<template>
	<view class="editor-box">
		<view
			v-if="showTabBar"
			class="editor-box-header"
		>
			<view
				class="operate-box"
				@tap="_addImage"
			>
				<text class="iconfont icon-image" />
			</view>
			<view
				class="operate-box"
				@tap="_format('italic')"
			>
				<text class="iconfont icon-italic" />
			</view>
			<view
				class="operate-box"
				@tap="_format('bold')"
			>
				<text class="iconfont icon-bold" />
			</view>
			<view
				class="operate-box"
				@tap="_format('header', 'h1')"
			>
				<text class="iconfont icon-h1" />
			</view>
			<view
				class="operate-box"
				@tap="_format('header', 'h2')"
			>
				<text class="iconfont icon-h2" />
			</view>
			<view
				class="operate-box"
				@tap="_format('header', 'h3')"
			>
				<text class="iconfont icon-h3" />
			</view>
			<view
				class="operate-box"
				@tap="_format('align', 'left')"
			>
				<text class="iconfont icon-alignLeft" />
			</view>
			<view
				class="operate-box"
				@tap="_format('align', 'right')"
			>
				<text class="iconfont icon-alignRight" />
			</view>
			<view
				class="operate-box"
				@tap="_format('list', 'ordered')"
			>
				<text class="iconfont icon-orderedList" />
			</view>
			<view
				class="operate-box"
				@tap="_format('list', 'bullet')"
			>
				<text class="iconfont icon-unorderedList" />
			</view>
			<view
				class="operate-box"
				@tap="_undo"
			>
				<text class="iconfont icon-undo" />
			</view>
		</view>
		<view class="editor-box-content">
			<Editor
				id="editor"
				class="fz-28 editor"
				:name="name"
				:value="editorValue"
				:placeholder="placeholder"
				:showImgResize="true"
				:show-img-toolbar="true"
				:show-img-resize="true"
				@Blur="blur"
				@Ready="_onEditorReady"
				@Input="_onInputting"
			/>
		</view>
	</view>
</template>
<script>
import Taro from '@tarojs/taro';
import { Editor } from '@tarojs/components';
// import request from '@/apis/public';
import './HgEditor.less';
export default {
	name: 'HgEditor',
	components: { Editor },
	props: {
		/** 是否显示工具栏 */
		showTabBar: {
			type: Boolean,
			value: true
		},
		placeholder: {
			type: String,
			value: '请输入图文详情'
		},
		name: {
			type: String,
			value: ''
		},
		editorValue: {
			type: String,
			value: ''
		}
	},
	data () {
		return {
			editorCtx: null
		};
	},
	methods: {
		blur () {
			this.editorCtx.blur();
		},
		_onEditorReady () {
			Taro.createSelectorQuery().select('#editor').context(res => {
				this.editorCtx = res.context;
				const that = this;
				setTimeout(() => {
					if (that.editorValue) {
						res.context.setContents({
							html: that.editorValue
						});
					} else {
						res.context.setContents({
							html: ''
						});
					}
					that.editorCtx.blur();
					Taro.pageScrollTo({
						scrollTop: 0,
						duration: 0
					});
				}, 100);
			}).exec();
		},
		// 插入图片
		_addImage (event) {
			Taro.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: (res) => {
					Taro.showLoading({
						title: '上传中',
						mask: true
					});
					this._uploadImage(res.tempFilePaths[0]);
				}
			});
		},
		_uploadImage (tempFilePath) {
			// request.uploadFileCommon('/common/img', tempFilePath, 'imgs', this.wxToken)
			// 	.then(res => {
			// 		if (res.result_code === 1) {
			// 			this.editorCtx.insertImage({
			// 				src: res.data[0]
			// 			});
			// 		} else {
			// 			Taro.showToast({
			// 				icon: 'error',
			// 				title: '上传失败',
			// 				mask: true
			// 			});
			// 		}
			// 		Taro.hideLoading();
			// 	})
			// 	.catch(e => {
			// 		Taro.showToast({
			// 			title: '上传失败',
			// 			icon: 'none',
			// 			duration: 1000 // 持续的时间
			// 		});
			// 		Taro.hideLoading();
			// 	});
		},
		_format (type, val) {
			this.editorCtx.format(type, val);
		},
		// 撤销
		_undo () {
			this.editorCtx.undo();
		},
		// 监控输入
		_onInputting (e) {
			const html = e.detail.html;
			// const text = e.detail.text;
			this.$emit('input', html);
		}
	}
};
</script>
