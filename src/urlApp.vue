<template>
  <div id="urlApp">
    <blogUrl v-bind:blogSet=opt />
  </div>
</template>

<script>
import blogUrl from './components/blogurl.vue'

export default {
  name: 'urlApp',
  components: {
    blogUrl
  },
  methods: {
    currentUrl(url){
      let mobile = url.replace("?m=1","");
      return mobile;
    }
  },
  created() {
    const el = document.querySelector("#blogUrl").dataset
    this.opt = {
      isSearch:el.search,
      keyword:el.keyword,
      currentUrl: this.currentUrl(window.location.href),
      title:el.title,
      blogId:'6674069127668960844',
      googleApi:'AIzaSyDTFxVUUSFWFmIkk6UyELUjYgnVuQmJ7O8'
    };
  }
}
</script>

<style>
#urlApp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 300px;
}
</style>
