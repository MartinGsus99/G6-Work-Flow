<template>
  <div class="form-wrapper">
    <el-form :model="taskForm" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="检测名称" prop="task_name">
        <el-col :span="20">
          <el-input v-model="taskForm.task_name"></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="报告配置" prop="task_conf">
        <el-col :span="20">
          <el-select
            v-model="taskForm.task_conf"
            placeholder="请选择配置"
            class="form-input"
          >
            <el-option
              v-for="item in configs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item> -->
      <!-- <el-form-item label="紧急程度" prop="level">
        <el-col :span="20">
          <el-select
            v-model="taskForm.level"
            placeholder="请选择紧急程度"
            class="form-input"
          >
            <el-option label="最高级" value="3"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="低级" value="1"></el-option>
            <el-option label="最低级" value="0"></el-option>
          </el-select>
        </el-col>
      </el-form-item> -->

      <el-form-item label="项目语言" prop="language">
        <el-col :span="20">
          <el-select v-model="taskForm.language" class="form-input">
            <el-option
              v-for="item in languages"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="项目文件">
        <el-upload
          action=""
          ref="uploader"
          :file-list="fileList"
          :http-request="httpFileRequest"
          :limit="limit"
          :on-change="onChange"
          :on-progress="uploadProcess"
          :on-success="uploadSuccess"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          show-file-list
        >
          <el-button size="small" type="">+</el-button>
          <!-- <div
            v-if="taskForm.language === '3'"
            slot="tip"
            class="el-upload__tip"
          >
            只能上传zip/jar文件，且不大于1Gb
          </div>
          <div
            v-else-if="taskForm.language === '0'"
            slot="tip"
            class="el-upload__tip"
          >
            只能上传.deb文件，且不大于1Gb
          </div>
          <div v-else slot="tip" class="el-upload__tip">
            只能上传zip文件，且不大于1Gb
          </div> -->
          <div
            slot="tip"
            class="el-upload__tip"
          >
          支持上传文件后缀为：zip、jar、deb的文件
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-col :span="20">
          <el-input v-model="taskForm.remark"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitClick">创建任务</el-button>
        <el-button @click="cancelClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadFile } from "@/api/uploadFile.js";

export default {
  props: {
    cancelClick: {
      default: null,
      type: Function,
    },
    submitClick: {
      default: null,
      type: Function,
    },
    taskForm: {
      default: null,
      type: Object,
    },
    rules: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      //file
      fileList: [],
      envfileList: [],
      limit: 1,
      envlimit: 1,
      uploading: false,
      uploadPercentage: 0,
      languages: [
        {
          name: "Java",
          value: "3",
        },
        {
          name: "Python",
          value: "2",
        },

        {
          name: "NodeJS",
          value: "1",
        },
        {
          name: "Debian",
          value: "0",
        },
      ],
      configs: [
        {
          label: "Javascript常规配置",
          value: "2",
        },
        {
          label: "Java常规配置",
          value: "1",
        },
        {
          label: "Python常规配置",
          value: "0",
        },
      ],
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    handleExceed() {
      this.$message.warning(`最多只能上传 ${this.limit} 个文件`);
    },
    getFormData(obj) {
      let formData = new FormData();
      if (!obj) return formData;
      for (let key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    httpFileRequest(param, fileType) {
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("files", fileObj); // 文件对象
      uploadFile(fd, param).then((res) => {
        this.$message.success(res.message || "执行成功");
        if (res.success) {
          let data = res.data;
          this.taskForm.name = data.name;
          this.taskForm.path = data.path;
          this.taskForm.source_name = data.sourceName;
          this.uploadPercentage = 100;
        }
      });
    },
    uploadProcess(event, file, fileList) {
      this.uploadPercentage = Math.floor(event.percent) - 2;
    },
    uploadSuccess(event, file, fileList) {
    },
    onChange(file, fileList) {
      this.fileRaw = file.raw;
      this.fileName = file.name;
    },
    handleRemove() {
      this.uploading = false;
      this.$refs.uploader.abort();
      let fileList = this.$refs.uploader.uploadFiles;
      for (let i = 0; i < fileList.length; i++) {
        fileList.splice(i, 1);
      }
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
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
    clearFiles() {
      this.$refs.uploader.clearFiles();
    },
  },
};
</script>

<style scoped>
.form-container {
  padding-left: 10px;
  margin: 10px;
}

.form-input {
  width: 100%;
}

.upload-process-container {
  width: 85%;
}
</style>
