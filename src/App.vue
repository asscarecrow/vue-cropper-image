<template>
  <div id="app">

    <div class="btn-wrap">
      <a @click="setExist" class="btn" href="javascript:;">crop an existing image</a>
      <a class="btn" href="javascript:;">upload an new image<input class="file" type="file" name="img" @change="setSrc"></a>
    </div>
    <cropper :src='src' :cropBoxResizable="false" :aspectRatio="16/9" ref="cropper" @cropped="cropped"/>

    <div class="preview">
      <img :src="cropedSrc">
    </div>
  </div>
</template>

<script>
import cropper from './components/cropper'
// import cropper from 'vue-cropper-image';
const srcPath = require('@/assets/clock.jpg');
export default {
  name: 'App',
  data() {
    return  {
      // src: 'https://getbootstrap.com/docs/4.1/assets/img/bootstrap-stack.png'
      src: '',
      cropedSrc: ''
    }
  },
  components: {
    cropper
  },
  methods: {
    setExist() {
      this.src = srcPath;
    },
    setSrc(e) {
      let $cropper = this.$refs.cropper;
      $cropper.createImgUrl(e.target.files[0])
    },
    cropped(canvas) {
      this.croppedSrc = canvas.toData
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .btn-wrap {width: 300px;margin: 56px auto;text-align: center;}
#app .btn-wrap .btn {position: relative;display: block;padding: 20px 0;margin-bottom: 15px;border: 2px solid #42b983;color: #42b983;font-size: 16px;text-decoration: none;}
#app .btn-wrap .btn .file {position: absolute;top: 0;left: 0;right: 0;bottom: 0;opacity: 0;z-index: 1;}
</style>
