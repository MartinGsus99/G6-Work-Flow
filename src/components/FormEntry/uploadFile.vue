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
  <i class="el-icon-plus" id="up-icon"></i>
  </el-upload>
</template>
<script>
  export default {
    name: 'uploadFileEntry',
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
        limit: 1,
        method: this.options?.method || 'post',
        inject: [this.clearFiles],
        iconBase: 'data:image/png;base64,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',
        fileName:'',
      };
    },
    methods: {
      httpRequest(param) {
        let fileObj = param.file // 相当于input里取得的files
        let fd = new FormData() // FormData 对象

        console.log("文件上传")
         fd.append('files', fileObj) // 文件对象
         fd.kind=this.keyName;
        uploadFile(fd).then((res) => {
          this.$message.success(res.message || '执行成功')
          // 处理成功情况
          if (res.success) {
            let data = res.data
            this.queryKeys.name   = data.name
            this.queryKeys.path   = data.path
            this.queryKeys.source_name=data.sourceName
            let houzhui = fileObj.name.split('.')
            let title = document.getElementsByClassName('el-upload-list__item-thumbnail')[0]
            if (houzhui[0] !== '') {
              title.src = this.iconBase
            }
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
      beforeUpload(file) {
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
        this.queryKeys.name = '';
      },
      getBase64(file) {
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          let imgResult = '';
          reader.readAsDataURL(file);
          reader.onload = function () {
            imgResult = reader.result;
          };
          reader.onerror = function (error) {
            reject(error);
          };
          reader.onloadend = function () {
            resolve(imgResult);
          };
        });
      },
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
        left: -5px
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
