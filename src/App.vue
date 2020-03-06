<template>
  <!-- <div id="app" :style="{'background-image': 'url(' + baseUrl + 'silhuett.png)'}"> -->
  <div id="app">
    <div id="nav">
      <router-link v-for="(page, index) in pageOrder" :to="page" :key="index" class="pages">{{ index + 1 }} </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { EventBus } from '@/event-bus.js';

export default {
  name: 'App',
  data: function() {
    return {
      baseUrl: process.env.BASE_URL,
      currentPage: 0,
      pageOrder: []
    }
  },
  mounted: function () { 
    window.addEventListener( "keydown", function (evt) {
      
      if(evt.keyCode === 37) {
        evt.preventDefault();
        EventBus.$emit('player-response', {player: 1, answer: 1 });
      }
      if(evt.keyCode === 38) {
        evt.preventDefault();
        EventBus.$emit('player-response', {player: 1, answer: 2 });
      }
      if(evt.keyCode === 39) {
        evt.preventDefault();
        EventBus.$emit('player-response', {player: 2, answer: 1 });
      }
      if(evt.keyCode === 40) {
        evt.preventDefault();
        EventBus.$emit('player-response', {player: 2, answer: 2 });
      }
      if(evt.keyCode === 32) {
        evt.preventDefault();
        EventBus.$emit('next-question');
      }
    }.bind(this)); 
  }
}  
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');

body {
  margin: 0;
  padding: 0;
  font-size: 18pt;
  background-color: deeppink;
}

#app {
    font-family: 'Lilita One', 'Gill Sans';
    font-size: 24pt;
    font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: beige;
}
#nav {
 padding-left:30px;
 position: absolute;
 display: none;
}

#nav a {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #666;
  border-radius: 15px;
  width:30px;
  height:30px;
  margin:5px;
  text-decoration: none;
  font-weight: bold;
  color: #ccc;
}

#nav a.router-link-exact-active {
  background-color: #ff0;
  color:black;
}

</style>
