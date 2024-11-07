<template>
	<view class="form-item  no-border">
		<text class="label">
			{{ label }}
		</text>
		<view class="ql-container">
			<HgEditor
				ref="hgEditor"
				:showTabBar="true"
				:editorValue="value"
				:placeholder="placeholder"
				:name="prop"
				@input="handleInput"
			/>
		</view>
	</view>
</template>
<script>
import HgEditor from '../HgEditor.vue';
import './editorField.less';

export default {
	name: 'EditorField',
	components: { HgEditor },
	props: {
		value: [String, Number],
		prop: String,
		label: String,
		placeholder: String,
		type: {
			type: String,
			default: 'text'
		},
		uploadImageURL: {
			type: String,
			value: ''
		},
		maxlength: {
			type: Number,
			default: 30
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleInput (content) {
			this.$emit('fieldChange', this.prop, content);
		},
		initEditor () {
			this.$refs.hgEditor._onEditorReady();
		}
	}
};
</script>
