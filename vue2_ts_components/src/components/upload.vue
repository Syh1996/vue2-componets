<template>
  <div class="upload-group">
    <Button
      type="default"
      icon="el-icon-upload"
      size="small"
      @click="disabled ? dialogVisible = false  : dialogVisible = true"
      :disabled="disabled"
      >{{ title || $t("uploadImport") }}</Button
    >
    <!--- dialog -->
    <Dialog
      :title="$t('importFile')"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      custom-class="upload-file-dialog"
      @closed="dialogClose"
    >
      <div class="dialog-content">
        <div
          :class="['file-name', fileName ? 'text-black' : 'text-hui']"
          @click="openFileChcked"
        >
          {{ fileName || $t("clickSelectFile") }}
          <i
            class="el-icon-delete"
            v-if="fileName"
            @click.stop="deleteFile"
          ></i>
        </div>
        <Button type="default" @click="openFileChcked" size="small">{{
          $t("selectFile")
        }}</Button>
        <input type="file" id="file" @change="fileChange" ref="file" />
        <Progress v-if="uploadNumber" :percentage="uploadNumber"></Progress>
      </div>
      <div slot="footer" class="dialog-footer">
        <Button
          size="small"
          icon="el-icon-refresh-left"
          @click="dialogVisible = false"
          >{{ $t("cancel") }}</Button
        >
        <Button
          size="small"
          :disabled="isLoading"
          :icon="isLoading ? 'el-icon-loading' : 'el-icon-upload2'"
          type="primary"
          @click="uploadServer"
          >{{ $t("uploadHost") }}</Button
        >
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { Button, Dialog, Progress } from "element-ui";
@Component({
  name: 'UploadGroup',
  components: {
    Button,
    Dialog,
    Progress,
  },
})
export default class UploadGroup extends Vue {
  @Prop({ default: () => {} }) callBack?: any;
  @Prop({ default: () => {} }) fn?: any; // 导入调用的接口
  @Prop({}) title?: string;
  @Prop({}) disabled?: boolean;

  // 加载中
  isLoading: boolean = false;
  /* @Prop({ default: "" }) url!: string; */
  // 是否展示dialog
  dialogVisible: boolean = false;

  fileName: string = "";
  uploadNumber: number = 0;
  /** 选择文件 */
  public openFileChcked() {
    (this.$refs.file as any).click();
  }
  /** 文件清除 */
  public deleteFile() {
    this.fileName = "";
    (this.$refs.file as any).value = "";
    this.uploadNumber = 0;
  }
  /** 关闭 */
  public dialogClose() {
    this.deleteFile();
  }
  /** 文件变化 */
  public async fileChange(e: any) {
    if (e) {
      const exts = ["xlsx", "xls"];
      const name: string = e.target.files[0].name;
      this.fileName = name;
      const ext: string = name.substring(name.lastIndexOf(".") + 1);
      if (!exts.includes(ext.toLowerCase())) {
        (this as any).$message({
          type: "warning",
          message: (this as any).$t("uploadExtErr") as string,
        });
        this.fileName = "";
        (this.$refs.file as any).value = "";
        return;
      }
    }
  }

  /** 文件转arrayBuffer */
  public async toBuffer(file: File, func: (data: any) => void): Promise<any> {
    return new Promise((resolve) => {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const dataURI: any = this.result;
        var byteString = atob(dataURI.split(",")[1]);
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        let reader2 = new FileReader();
        reader2.onload = function (result: any) {
          resolve(func(result.target.result));
        };
        reader2.readAsArrayBuffer(blob);
      };
    });
  }


  /** 上传进度 */
  public onUploadProgress(data: any) {
    this.uploadNumber = Math.floor((data.loaded / data.total) * 100);
  }
  /** 上传到服务器 */
  public async uploadServer() {
    const files = (this.$refs.file as any).files;
    if (files && files.length) {
      this.isLoading = true;
        // 上传文件
        try {
          // const data = await uploadFile([files[0]]);
          const data = await this.fn([files[0]], this.onUploadProgress);
          this.dialogVisible = false;
          this.isLoading = false;
          this.deleteFile();
          this.callBack(data);
        } catch (e) {
          this.callBack(null);
        }
  }
}
}
</script>

<style scoped lang="less">
#file {
  position: fixed;
  left: -999999px;
  top: -9999999px;
  opacity: 0;
}
.upload-group {
  display: inline-block;
  .file-name {
    width: 400px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    text-align: left;
    padding: 0 40px 0 10px;
    line-height: 30px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    .el-icon-delete {
      right: 15px;
      top: 5px;
      cursor: pointer;
      font-size: 20px;
      position: absolute;
    }
    cursor: pointer;
    &.text-hui {
      color: #bfbbbb;
    }
    &.text-black {
      color: #726c6c;
    }
  }
  ::v-deep {
    .el-button {
      margin-right: 25px;
      vertical-align: middle;
    }
    .upload-file-dialog {
      text-align: left;
      .el-dialog__body {
        text-align: center;
        .el-button {
          margin-left: -1px;
          vertical-align: middle;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          height: 32px;
          margin-right: 0;
        }
      }
      .el-progress{
        width: 480px;
        margin: 10px auto 0;
      }

      .dialog-footer {
        text-align: center;
        .el-button {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
