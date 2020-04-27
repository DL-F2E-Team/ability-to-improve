<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
  @font-face {
    font-family: 'Moholy Sans';
    font-style: normal;
    font-weight: normal;
    src: url(./assets/fonts/MoholySans-Regular.woff2) format('woff2'),
    url(./assets/fonts/MoholySans-Regular.woff2) format('woff');
  }

  @font-face {
    font-family: 'Moholy Sans';
    font-style: normal;
    font-weight: bold;
    src: url(./assets/fonts/MoholySans-Bold.woff2) format('woff2'),
    url(./assets/fonts/MoholySans-Bold.woff2) format('woff');
  }

  @font-face {
    font-family: 'Moholy Sans';
    font-style: normal;
    font-weight: 300;
    src: url(./assets/fonts/MoholySans-Light.woff2) format('woff2'),
    url(./assets/fonts/MoholySans-Light.woff2) format('woff');
  }

  #app {
  font-family: 'Moholy Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
