<template>
  <aside class="hello">
    <h2>{{mag}}</h2>
    <ul>
      <transition-group name="list" tag="p">
      <li v-for="link in url" :key="link.id" :class="[currentHttps(link.url) ? 'on' :'']">
        <div class="current" v-if="currentHttps(link.url)"></div>
        <p class="current" v-if="currentHttps(link.url)">보고 있는 글</p>
        <a :href="link.url" >
          <img :src="thumb(link.images[0].url)" >
          <span class="title">{{link.title}}</span>
          <span class="date">{{split(link.published)}}</span>
        </a>
      </li>
      </transition-group>
    </ul>
  </aside>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

let domScroll;
 
Vue.use(VueAxios, axios)

export default {
  name: "myBlogList",
  props: {
    blogSet: Object
  },
  methods: {
    open() {

      //내 블로그
      const blogApiroot = "https://blogger.googleapis.com/v3/blogs/"+this.blogSet.blogId+"/posts",
            blogApicord = "key="+this.blogSet.googleApi;
      //옵션 API
      let isUpdated ="";
      if(this.blogSet.update == "yes"){
        isUpdated = "updated";
        //console.log('updated');
      } else {
        isUpdated = "PUBLISHED";
        //console.log('PUBLISHED');
      }

      let blogOptApi ="&fetchBodies=false&orderBy="+isUpdated+"&maxResults="+this.blogSet.limit+"&fetchImages=true&";
      
      //검색 설정 대표 이미지 누락으로 비 활성화
      /*
      if(this.blogSet.isSearch == "true"){
        getList = blogApiroot+"/search?q="+this.blogSet.keyword+blogOptApi+blogApicord
        //console.log(getList,true);
      } else {
        getList = blogApiroot+"?labels="+this.blogSet.keyword+blogOptApi+blogApicord
        //console.log(getList,false);
      }
      */

      //GET URL
      axios
        .get(blogApiroot+"?labels="+this.blogSet.keyword+blogOptApi+blogApicord)
        .then(r => r.data.items)
        .then((response) => {
          this.url = response;
          this.mag = this.blogSet.title;
          //console.log(this.url , "blogListJson")
          //console.log(this.blogSet , "this.blogSet")
          this.$forceUpdate();
      })
    },
    clearCall(){
      clearInterval(domScroll);
    },
    setupListDom(){
      let scrollTop = window.pageYOffset + (window.innerHeight+410);
      let offset = this.blogSet.el.getBoundingClientRect().height;
      let scrollHeight = offset - window.innerHeight;

      if(scrollTop > scrollHeight){
        this.clearCall();
        this.open();
      }
      //console.log(scrollTop, scrollHeight ,"---- scrollTop, ---- scrollHeight ",offset);
    },
    thumb(url){
      let imgThumb = url.replace("/d/","/s55-c/");
      return imgThumb;
    },
    currentHttps(url){
      let currentUrl = this.blogSet.currentUrl;
      let https = url.replace("http:","https:");
      return (currentUrl == https) ? true : false;
    },
    split(tx){
      let year = tx.substring(0,4),
          mm = tx.substring(5,7),
          dd = tx.substring(8,10);
      return "게시된 날짜 : "+year+"년"+mm+"월"+dd+"일";
    }
  },
  created() {
    this.mag = "포스트 로딩중..."
    this.url = [];
    //this.open();
    //console.log(this.blogSet,'blogSet prop')

    // 리스트 스크롤 
    this.clearCall();
    domScroll = setInterval(()=>{
      this.setupListDom();
    },100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  color: #fff;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  text-align: left;
  position: relative;
  padding: 1em 1em 1em 1em;
  border-radius: 1em;
  margin: .6em 0;
  border: 1px solid #6b6969;
  transition: all .3s;
  overflow: hidden;
  clear: both;
}
li.on{
  border-color: #ff8a25;
}
li a{
  text-decoration: none;
  padding: 0;
  margin: 0;
}
li a img{
  float: left;
  width: 55px;
  height: 55px;
  margin-right: 1em;
  border-radius: .5em;
}
li:hover{
  background: #000;
}
li div.current{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  background-color: #000;
  opacity: 0.5;
}
li p.current{
  background-color: #ff8a25;
  opacity: 1;
  text-align: center;
  font-weight: bold;
  color: #000;
  position: absolute;
  padding: 0 1em;
  margin: 0;
  font-size: 1.2em;
  right: 0;
  top:0;
  border-radius: 0em 0em 0em .5em;
}
a {
  color: #ff8a25;
  vertical-align: middle;
}
a span {
  display: block;
  line-height: 1.5em;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 72%;
}
a span.title{
  font-size: 1em !important;
  line-height: 1.5em !important;
  margin: 0 !important;
}
a span.date{
  font-size: .9em;
  margin-top: .7em;
  color: #b5b5b5;
}

#urlApp .hello .list-enter-active:nth-child(1){
   transition: all .3s ;
}
#urlApp .hello .list-enter-active:nth-child(2){
   transition: all .8s;
}
#urlApp .hello .list-enter-active:nth-child(3){
   transition: all 1.1s;
}
#urlApp .hello .list-enter-active:nth-child(4){
   transition: all 1.4s;
}
#urlApp .hello .list-enter-active:nth-child(5){
   transition: all 1.7s;
}

.list-item {
  display: inline-block;
}
.list-enter-active, .list-leave-active {
  transition: all 2s;
  border: 1px solid #fff;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(100px);
  transform: rotate( -5deg );
}
</style>
