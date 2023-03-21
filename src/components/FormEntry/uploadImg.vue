<template>
  <el-upload
    ref="uploader"
    class="upload-file-entry-wrap"
    list-type="picture-card"
    :multiple="isMultiple"
    :show-file-list="showFileList"
    action=""
    :limit="limit"
    auto-upload
    :on-change="onChange"
    :http-request="httpRequest"
    :on-exceed="handleExceed"
    :on-success="onSuccess"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>
<script>
  export default {
    name: 'uploadImgEntry',
    props: {
      showFileList: { default: true, type: Boolean },
      isMultiple: { default: true, type: Boolean },
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      options: { default: null, type: Object },
      fileType: { default:null, type: String },
    },
    mounted() {
    },
    data() {
      return {
        fileRaw: '',
        fileName: '',
        limit: 1,
        url: this.options?.url || '/api/file/upload',
        method: this.options?.method || 'post',
        inject: [this.clearFiles]
      };
    },
    methods: {
      httpRequest(param) {
        let fileObj = param.file // 相当于input里取得的files
        let fd = new FormData() // FormData 对象
        fd.append('file', fileObj) // 文件对象
        uploadImg(fd).then((res) => {
          this.$message.success(res.message || '执行成功')
          // 处理成功情况
          if (res.success) {
            let data = res.data
            this.queryKeys.picId = data.id || ''
          }
        })
      },
      onChange(file, fileList) {
        this.fileRaw = file.raw;
        this.fileName = file.name;
      },
      onSuccess() {
        this.$emit('uploadSuccess', this.queryKeys);
      },
      beforeUpload() {
        this.$emit('uploadBefore', this.queryKeys);
      },
      handleExceed() {
        this.$message.warning(`最多只能上传 ${this.limit} 个文件`);
      },
      clearFiles() {
        this.$refs.uploader.clearFiles();
      },
      handleRemove() {
        let fileList = this.$refs.uploader.uploadFiles;
        for (let i = 0; i < fileList.length; i++) {
          fileList.splice(i, 1)
        }
      }
    },
  };
</script>
<style lang="scss">
  .upload-file-entry-wrap {
    height: 36px;
    .el-upload-list {
      display: inline-block;
      .el-upload-list__item {
        margin-bottom: 0;
        width: 36px;
        height: 36px;
      }
    }
    .el-upload--picture-card {
      width: 36px;
      height: 36px;
      line-height: 36px;
      .el-icon-plus:before {
        font-size: 18px;
      }
    }
    .el-upload-list__item-status-label,
    .el-icon-close,
    .el-icon-close-tip {
      display: none !important;
    }
  }
</style>
