<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.compress_imgTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="upload_img">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="1"
        :on-change="handleChange"
        :before-upload="handleExceed"
        v-model:file-list="fileList"
      >
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <!-- <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <el-icon><zoom-in /></el-icon>
              </span> -->
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="downloadImg">
                <el-icon><Download /></el-icon>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
    </div>
    <div class="drag_box" v-if="show">
      {{ $t(`message.CompressionRatio`) }}:{{ `${dragNum}%` }}
      <el-slider v-model="dragNum" placement="right" @change="handleGragChange" />
    </div>
    <div class="img_box" v-if="show">
      <div class="or_img">
        {{ $t(`message.Originalfile`) }}<span style="color: #ec2f2f">{{ or_size }}kb</span>
      </div>
      <div class="or_img">
        {{ $t(`message.AfterCompression`) }}<span style="color: #13ac1a">{{ compressedImgSize }}kb</span>
      </div>
      <div class="img_boxs">
        <img :src="compressedImg" />
      </div>
      <div class="btn_box">
        <el-button type="primary" style="width: 100%" @click="downloadImg">{{ $t(`message.downloadFile`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';

const disabled = ref(false);
const dragNum = ref(0);
const show = ref(false);

//压缩后的图片
const compressedImg = ref('');
const compressedImgSize = ref(0);

const fileList = ref([]);

const or_size = ref(0);

function compressImage(sourceImg, percentage, callback) {
  // 创建一个图片对象
  var img = new Image();
  // 允许跨域获取图片
  img.crossOrigin = 'Anonymous';
  // 设置图片的源地址
  img.src = sourceImg;

  img.onload = function () {
    // 创建canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // 计算新的尺寸
    canvas.width = img.width * (percentage / 100);
    canvas.height = img.height * (percentage / 100);

    // 将图片按照新的尺寸绘制到canvas上
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 将canvas转换为图片的URL
    let newDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 第二个参数是输出图片质量

    // 转换base64编码为Blob对象
    let blob = dataURLToBlob(newDataUrl);

    // 调用回调函数处理结果，返回压缩后的图片地址和大小
    callback(newDataUrl, blob.size);
  };

  img.onerror = function () {
    callback(null, 'Image could not be loaded.');
  };
}

// Helper函数用来将base64字符串转换成Blob对象
function dataURLToBlob(dataUrl) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//拖拽
const handleGragChange = () => {
  // 使用方法，例如用户输入50，表示压缩50%
  console.log(dragNum.value, 'dragNum.value');
  compressImage(fileList.value[0].url, dragNum.value, function (newDataUrl, size) {
    compressedImgSize.value = size / 1000;
    // newImgUrl 是一个包含压缩后图片的DataURL
    compressedImg.value = newDataUrl;
    // 这里你可以用新的图片URL来显示图片或者做其他处理
  });
};

//覆盖
const handleExceed = () => {
  fileList.value = [];
};

const handleChange = file => {
  or_size.value = file.size / 1000;
  show.value = true;
};

const handleRemove = file => {
  fileList.value = [];
  compressedImg.value = '';
  compressedImgSize.value = 0;
  show.value = false;
};

//点击下载
const downloadImg = file => {
  if (compressedImg.value == '') {
    return;
  }
  const link = document.createElement('a');
  link.href = compressedImg.value;
  link.download = 'compressed_image.jpg';
  link.click();
};

//压缩
</script>

<style scoped lang="scss">
.col2json {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  .img_boxs {
    width: 100%;
    height: auto;
    max-width: 100%;
    margin-top: 0.8rem;
    > img {
      width: auto;
      max-width: 100%;
    }
  }
  .img_box {
    width: 100%;
    height: auto;
    background-color: var(--img-bg);
    margin-top: 1.8rem;
    border: 1px solid var(--img-bg-border);
    border-radius: 0.4rem;
    padding: 0.8rem;
    .or_img {
      width: 100%;
      height: 2.6rem;
      border-radius: 0.4rem;
      background-color: var(--box-hover);
      text-indent: 0.8rem;
      line-height: 2.6rem;
      margin-top: 0.8rem;
    }
    .btn_box {
      width: 100%;
      height: 2.6rem;
      margin-top: 0.8rem;
    }
  }
  .drag_box {
    width: 100%;
    height: 2rem;
    margin-top: 0.8rem;
  }
  .look_img {
    width: 100%;
    height: auto;
  }
  .upload_img {
    width: 100%;
    margin-top: 0.8rem;
  }
  .selet_box {
    width: 100%;
    height: 2.5rem;
  }
  .bottom_btn {
    width: 100%;
    height: auto;
    min-height: 2.5rem;
    padding: 0.8rem 0;
    display: flex;
    flex-wrap: wrap;
    .btn_item {
      margin-right: 0.8rem;
      margin-top: 0.8rem;
    }
  }
  .title {
    width: 100%;
    height: 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--paimary-color);
  }

  .Excel_box {
    width: 100%;
    height: 20rem;
    margin-top: 0.8rem;
    background: var(--primary-Headers);
  }
}
</style>
