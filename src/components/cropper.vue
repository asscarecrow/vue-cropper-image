<template>
<section class="crop-wrapper">
  <header class="bar" ref="bar">
    <button class="btn btn-yes">确定</button>
    <button class="btn btn-cancel">取消</button>
  </header>

    <div class="model" :style="{top: modelTop}"></div>
    <div class="core">
      <img src="~assets/logo.png" v-initCrop="cropImg" id='cropImg'>
    </div>

</section>
</template>
<script>
import Cropper from "cropperjs"

export default {
  directives: {
    initCrop: {
      bind: function(el,binding) {
        new Cropper(el);
      }
    }
  },
  data() {return {
    modelTop: 0
  }},
  mounted() {
    this.$nextTick(() => {
      let $bar = this.$refs.bar;
      this.modelTop = $bar.clientHeight;
    })
  }
}
</script>
<style>
.crop-wrapper {position: fixed;top: 0;left: 0;bottom: 0;right: 0;}
.crop-wrapper .bar {padding: 6px 22px;background: #fff;}
.crop-wrapper .bar .btn {padding: 3px 6px;margin-left: 5px;margin-right: 5px;}
.crop-wrapper .content {}
.crop-wrapper .model {position: absolute;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);}
</style>
