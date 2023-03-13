<template>
  <view class="page-editor">
    <view style="border: 1px solid #ccc">
      <!-- 工具栏 -->
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
      <!-- 编辑器 -->
      <Editor
        style="height: 700px"
        :defaultConfig="editorConfig"
        v-model="father_editorContent"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </view>
    <view class="htmlLength" :class="[htmlLength > 5000 ? 'c-r' : '']">{{ `${htmlLength}/5000` }}</view>
    <!-- <view style="margin-top: 10px">
      <textarea v-model="html" readonly style="width: 100%; height: 200px; outline: none"></textarea>
    </view> -->
  </view>
</template>

<script>
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import client, { putObject } from '@/config/alioss'

  export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    props: {
      editorContent: String,
      spinning: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'word',
      },
    },
    data() {
      let that = this
      return {
        father_editorContent: '',
        client,
        editor: null,
        htmlLength: 0,
        toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          excludeKeys: [
            /* 隐藏哪些菜单 */
            'headerSelect', // 标题
            'blockquote',
            // 'bold', // 粗体
            // 'fontSize',
            'fontFamily', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'group-more-style', // 更多
            'bulletedList',
            'numberedList',
            'todo', //
            'insertLink',
            'insertTable',
            'codeBlock', // 代码块
            'divider', // 横线
            'fullScreen', // 全屏
            'undo',
            'redo',
            'insertImage',
            'insertVideo',
          ],
        },
        uploding: false,
        editorConfig: {
          placeholder: '',
          autoFocus: true,
          hoverbarKeys: {
            text: {
              menuKeys: ['fontSize', 'bold', 'color', 'bgColor', 'clearStyle'],
            },
            image: {
              // 清空 image 元素的 hoverbar
              menuKeys: [],
            },
          },
          // 所有的菜单配置，都要在 MENU_CONF 属性下
          MENU_CONF: {
            fontSize: {
              fontSizeList: ['18px', '16px', '14px', '12px'],
            },
            uploadImage: {
              customUpload(file, insertFn) {
                that.$emit('uploding', true)
                return new Promise((resolve) => {
                  // 插入一张图片，模拟异步
                  setTimeout(() => {
                    putObject(file)
                      .then(
                        (result) => {
                          insertFn(result.url, Math.random(), result.url)
                          resolve('ok')
                          that.$emit('uploding', false)
                        },
                        (error) => {
                          resolve('ok')
                        }
                      )
                      .finally(() => {})
                  }, 500)
                })
              },
            },
            uploadVideo: {
              customUpload(file, insertFn) {
                that.$emit('uploding', true)
                return new Promise((resolve) => {
                  // 插入一张视频，模拟异步
                  setTimeout(() => {
                    putObject(file)
                      .then(
                        (result) => {
                          insertFn(result.url, Math.random(), result.url)
                          resolve('ok')
                          that.$emit('uploding', false)
                        },
                        (error) => {
                          resolve('ok')
                        }
                      )
                      .finally(() => {})
                  }, 500)
                })
              },
            },
          },
        },
      }
    },
    watch: {
      editorContent(val) {
        this.father_editorContent = val
      },
    },
    methods: {
      // 获取编辑器变量
      onCreated(editor) {
        this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      },
      // 监听变化
      onChange(editor) {
        const regex = /(<([^>]+)>)/gi
        const content = editor.getHtml()
        this.htmlLength = content.replace(regex, '').length
        this.$emit('update:editorContent', content)
        this.$emit('cb', content)
      },
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
  }
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
  .w-e-textarea-video-container {
    video {
      width: 100%;
    }

    box-shadow: none !important;
    background-image: none !important;
    border: none;
  }

  .w-e-modal button {
    height: auto !important;
  }

  .page-editor {
    position: relative;

    .htmlLength {
      position: absolute;
      bottom: 0;
      right: 20px;
      z-index: 9999;

      &.c-r {
        color: red;
      }
    }
  }
</style>
