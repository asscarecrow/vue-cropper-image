<template>
<section class="crop-wrapper">
  <header class="bar" ref="bar">
    <button class="btn btn-preview" @click="doPreview">预览</button>
    <button class="btn btn-yes">确定</button>
    <button class="btn btn-cancel">取消</button>
  </header>

    <!-- <div class="model" :style="{top: modelTop}"></div> -->
    <div class="core" :style="wrapperStyle">
      <img :src="src" :id='id'>
    </div>
    <div class="preview-wrap" v-show="showPreview" @click="showPreview=false">
      <div ref="preview" class="preview"></div>
    </div>
</section>
</template>
<script>
import Cropper from "cropperjs"
import 'cropperjs/dist/cropper.css';
/* TODO:
1. 窗口调整的时候，动态计算可编辑区域的长宽高
2. 预览功能
3. 顶部放大缩小功能的样式
 */
var $cropper = null;
var $preview = null;
var $previewImg = null;
export default {
  props: {
    id: {
      type: String,
      default: 'cropImg'
    },
    aspectRatio: Number,
    preview: '.crop-wrapper .preview',
    src: {
      type: String
    }
  },
  data() {return {
    modelTop: 0,
    showPreview: false,
    wrapperStyle: {'width': '100%', 'height': '100%'},
    previewStyle: {'width': '500px', 'height': '300px'}
  }},
  computed: {
    config() {
      let config = {};
      config.preview = this.preview;
      if(typeof this.aspectRatio === 'number') {
        config.aspectRatio = this.aspectRatio;
      }
      return config;
    }
  },
  mounted() {
    let $bar = this.$refs.bar;
    this.modelTop = $bar.clientHeight;
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      $preview = this.$refs.preview;
      let default_config = {
        ready: function () {
          var clone = this.cloneNode();
          clone.className = ''
          clone.style.cssText = (
            'display: block;' +
            'width: 100%;' +
            'min-width: 0;' +
            'min-height: 0;' +
            'max-width: none;' +
            'max-height: none;'
          );
          $preview.appendChild(clone.cloneNode());
        },
        crop: function (e) {
          $previewImg = document.getElementById(_this.id);
          if(!$previewImg) return false;
          var data = e.detail;
          var cropper = this.cropper;
          var imageData = cropper.getImageData();
          var boxData = cropper.getCropBoxData();
          $preview.style.width = boxData.width + 'px';
          $preview.style.height = boxData.height + 'px';
          $preview.style.marginLeft = -boxData.width/2 + 'px';
          $preview.style.marginTop  = -boxData.height/2 + 'px';
          var previewAspectRatio = data.width / data.height;
          var imageScaledRatio = data.width / boxData.width;
          $previewImg.style.height = boxData.height + 'px';
          $previewImg.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
          $previewImg.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
          $previewImg.style.marginLeft = -data.x / imageScaledRatio + 'px';
          $previewImg.style.marginTop = -data.y / imageScaledRatio + 'px';
        }
      }
      $cropper = new Cropper(document.getElementById(this.id), default_config);
      this.setWrapperStyle();

    },
    setWrapperStyle() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      let height = h - this.modelTop;
      let style = {width: `${w}px`, height: `${height}px`};
      this.wrapperStyle = style;
    },
    doPreview() {
      if($cropper !== null) {
        // let box = $cropper.getCropBoxData();
        // this.previewStyle = {width: `${box.width}px`, height: `${box.height}px`};
        this.showPreview = true;
      }
    }
  }
}
</script>
<style>
.crop-wrapper {position: fixed;top: 0;left: 0;bottom: 0;right: 0;}
.crop-wrapper .bar {padding: 6px 22px;background: #fff;}
.crop-wrapper .bar .btn {padding: 3px 6px;margin-left: 5px;margin-right: 5px;}
.crop-wrapper .content {}
.crop-wrapper .model {position: absolute;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);}
.crop-wrapper .core>img {max-width: 100%}
.crop-wrapper .preview-wrap {position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: 0;background-color: rgba(0,0,0,0.7);z-index: 999;}
.crop-wrapper .preview-wrap .preview {position: absolute;top: 50%;left: 50%;}
</style>
