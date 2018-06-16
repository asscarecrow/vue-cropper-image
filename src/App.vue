<template>
  <div id="app">
    <!-- <input type="file" name="img" @change="setSrc"> -->
    <cropper :src='src' :aspectRatio="16/9" :show="true"/>
  </div>
</template>

<script>
// import cropper from './components/cropper'
import cropper from 'vue-cropper-image';
// const srcPath = require('@/assets/clock.jpg');
export default {
  name: 'App',
  data() {
    return  {
      src: 'https://getbootstrap.com/docs/4.1/assets/img/bootstrap-stack.png'
    }
  },
  components: {
    cropper
  },
  methods: {
    setSrc(e) {
      this.src = e.target.files[0];
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
</style>
