<template>
<section class="crop-wrapper">
  <header class="bar" ref="bar">

    <div class="btn-wrap">
    <button class="btn btn-preview" @click="doPreview">
      <svg class="crop-icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      预览</button>
    <button class="btn btn-yes" @click="yes">
      <svg class="crop-icon" aria-hidden="true">
        <use xlink:href="#icon-tupiancaijian"></use>
      </svg>
      确定</button>
    <button class="btn btn-cancel" @click="cancel">
      <svg class="crop-icon" aria-hidden="true">
        <use xlink:href="#icon-cancel"></use>
      </svg>
      取消</button>
      </div>
      <div class="control" v-if="!isH5">
        <button class="btn btn-enlarge" @click="zoomIn">
        <svg class="crop-icon" aria-hidden="true">
          <use xlink:href="#icon-enlarge"></use>
        </svg>
        放大</button><button class="btn btn-reduce" @click="zoomOut">
        <svg class="crop-icon" aria-hidden="true">
          <use xlink:href="#icon-reduce"></use>
        </svg>
        缩小</button>
      </div>
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
import axios from "axios";
import Cropper from "cropperjs"
import 'cropperjs/dist/cropper.css';
import '@/assets/font/iconfont.js';
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
    name: {
      type: String,
      default: 'src'
    },
    src: {
      type: String
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {return {
    modelTop: 0,
    showPreview: false,
    wrapperStyle: {'width': '100%', 'height': '100%'},
    previewStyle: {'width': '500px', 'height': '300px'},
    isH5: true
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
    let winWidth = document.body.clientWidth;
    if(winWidth > 751) {
      // 小于ipad都认为是mobile
      this.isH5 = false;
    }
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      $preview = this.$refs.preview;
      let default_config = {
        response: true,
        ready: function (e) {
          var clone = this.cloneNode();
          var cropper = this.cropper;
          var boxData = cropper.getCropBoxData();
          clone.className = ''
          clone.id = `${_this.id}_clone`
          clone.style.cssText = (
            'display: block;' +
            'width: 100%;' +
            'min-width: 0;' +
            'min-height: 0;' +
            'max-width: none;' +
            'max-height: none;'
          );
          $preview.appendChild(clone);
          _this.setPreviewStyle(boxData);
        },
        crop: function (e) {
          $previewImg = document.getElementById(`${_this.id}_clone`);
          if(!$previewImg) return false;
          var data = e.detail;
          var cropper = this.cropper;
          var imageData = cropper.getImageData();
          var boxData = cropper.getCropBoxData();
          _this.setPreviewStyle(boxData);
          var previewAspectRatio = data.width / data.height;
          var imageScaledRatio = data.width / boxData.width;
          $previewImg.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
          $previewImg.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
          $previewImg.style.marginLeft = -data.x / imageScaledRatio + 'px';
          $previewImg.style.marginTop = -data.y / imageScaledRatio + 'px';
        }
      }
      $cropper = new Cropper(document.getElementById(this.id), default_config);
      this.setWrapperStyle();
      /* window.addEventListener('resize', _.debounce(function(){
          _this.setWrapperStyle();
      }, 50)) */
    },
    setPreviewStyle(boxData) {
      $preview.style.width = boxData.width + 'px';
      $preview.style.height = boxData.height + 'px';
      $preview.style.left = boxData.left + 'px';
      $preview.style.top = (parseInt(boxData.top) + parseInt(this.modelTop)) + 'px';
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
    },
    yes() {
      var _this = this;
      _this.$emit('beforeUpload');
      /* let url = $cropper.getCroppedCanvas().toDataURL('image/jpg');
      let formData = new FormData();
      formData.append(_this.name, url);
      formData.append('filename',"pocket-watch-3156771_1920.jpg");
      axios.post(_this.url, formData)
        .then(data => {
          _this.$emit('afterUpload', data);
          console.log(data);
        })
        .catch(data => {
          _this.$emit('uploadError', data);
          console.error(data);
        }) */
      $cropper.getCroppedCanvas().toBlob(blob => {
        var formData = new FormData();
        formData.append(_this.name, blob);
        formData.append('filename', 'demo.jpg')
        axios.post(_this.url, formData)
        .then(data => {
          _this.$emit('afterUpload', data);
          console.log(data);
        })
        .catch(data => {
          _this.$emit('uploadError', data);
          console.error(data);
        })
      });
    },
    cancel() {
      $cropper.reset();
    },
    zoomIn() {
      $cropper.zoom(0.1);
    },
    zoomOut() {
      $cropper.zoom(-0.1);
    }
  }
}
</script>
<style>
.crop-wrapper {position: fixed;top: 0;left: 0;bottom: 0;right: 0;}
.crop-wrapper .bar {position: relative;padding: 8px 22px;background: #fff;font-size: 14px;}
.crop-wrapper .bar button {outline: none;}
.crop-wrapper .model {position: absolute;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);}
.crop-wrapper .core>img {max-width: 100%}
.crop-wrapper .preview-wrap {position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: 0;background-color: rgba(0,0,0,0.8);z-index: 999;}
.crop-wrapper .preview-wrap .preview {position: absolute;top: 50%;left: 50%;overflow: hidden;}

.crop-wrapper .bar .btn-wrap {position: absolute; right: 22px;top: 6px;}
.crop-wrapper .btn-wrap .btn {padding: 6px 14px;margin-left: 7px;margin-right: 7px;border-radius: 3px;color: #fff;border: 1px solid #dcdfe6;}
.crop-wrapper .btn-wrap .btn-preview {color: #409eff;background: #ecf5ff;border-color: #b3d8ff;}
.crop-wrapper .btn-wrap .btn-yes {color: #67c23a;background: #f0f9eb;border-color: #c2e7b0;}
.crop-wrapper .btn-wrap .btn-cancel {color: #909399;background: #f4f4f5;border-color: #d3d4d6;}
.crop-wrapper .btn-wrap .btn:hover {color: #fff;}
.crop-wrapper .btn-wrap .btn-preview:hover {background: #409eff;}
.crop-wrapper .btn-wrap .btn-yes:hover {background: #67c23a;}
.crop-wrapper .btn-wrap .btn-cancel:hover {background: #909399;}

.crop-wrapper .control .btn {padding: 6px 14px;color: #fff;background-color: #409eff;border-color: #409eff;}
.crop-wrapper .control .btn:hover {background-color: #0062cc;border-color: #005cbf;}
.crop-wrapper .control .btn-enlarge {border-top-left-radius: 3px;border-bottom-left-radius: 3px;border-right-color: #74b3f7;}
.crop-wrapper .control .btn-reduce {border-top-right-radius: 3px;border-bottom-right-radius: 3px;}
/* icon style */
.crop-wrapper .crop-icon {width: 1em; height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;}

@media screen and (max-width: 752px) {
.crop-wrapper .bar .btn-wrap {position: relative;right: auto;top: auto;font-size: 12px;}
}
</style>
