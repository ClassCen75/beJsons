<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.SVGConversion`) }}</div>
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
    <div class="img_box" v-if="show">
      <div class="btn_box">
        <el-button type="success" style="width: 100%" @click="convert">{{ $t(`message.convert`) }}</el-button>
      </div>

      <div class="btn_box">
        <el-button type="primary" style="width: 100%" @click="downloadImg">{{ $t(`message.downloadFile`) }}</el-button>
      </div>

      <div class="img_boxs" v-if="fileList.length > 0 && svgImg != ''">
        <img :src="fileList[0].url" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import ImageTracer from 'imagetracerjs';

const disabled = ref(false);
const show = ref(false);

//压缩后的图片

const fileList = ref([]);

const or_size = ref(0);

//svg图片
const svgImg = ref('');

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
  show.value = false;
};

//点击转换
const convert = () => {
  // 设置想要的宽度和高度
  const options = {
    // 宽度和高度应该是数字
    width: 500,
    height: 500
    // 其他选项，例如颜色数量、描边宽度等
    // ...
  };
  // 使用 FileReader API 读取文件内容
  const reader = new FileReader();
  reader.onload = event => {
    ImageTracer.imageToSVG(
      event.target.result,
      svgString => {
        // 这里的 svgString 是图片转换成的SVG内容
        svgImg.value = svgString;
        // 处理svgString，例如显示在页面上或者下载等
        ElMessage.success('Image conversion successful');
      },
      options
    );
  };
  // 确保这里传递的是一个File对象
  reader.readAsDataURL(fileList.value[0].raw);
};

//点击下载
const downloadImg = file => {
  if (svgImg.value == '') {
    return;
  }
  // 或者创建一个下载链接
  const blob = new Blob([svgImg.value], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'image.svg';
  link.click();
};

//压缩
</script>

<style scoped lang="scss">
.col2json {
  width: 100%;
  margin-top: 0.8rem;
  .img_boxs {
    width: 100%;
    max-width: 100%;
    margin-top: 0.8rem;
    > img {
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
