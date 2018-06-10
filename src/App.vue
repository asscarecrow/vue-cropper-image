<template>
  <div id="app">
    <cropper :src='src' :aspectRatio="16/9"/>
  </div>
</template>

<script>
import cropper from './components/cropper'
const srcPath = require('@/assets/clock.jpg');
export default {
  name: 'App',
  data() {
    return  {
      src: srcPath
    }
  },
  components: {
    cropper
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
