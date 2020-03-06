<template>
    <div class="page-wrapper">
      <div ref="road" class="road-wrapper">
        <RoadSVG id="roady"/>
        <CarFrontSVG id="car"/>
        <component v-for="(item, index) in victims" :is="victims[index]" class="victim main" :style="{transform: 'scale(0.4) translate(' + (index*100) + 'px)'}" :key="'v' + index"/>
        <CarBackSVG id="car2"/>
        <component v-for="(item, index) in otherVictims" :is="otherVictims[index]" class="victim other" :key="'o' + index"/>
      </div>
      <ChildSVG class="victimB"/>
      <RunningChildSVG class="victimB"/>
      <MooseSVG class="victimB"/>
      <FamilySVG class="victimB"/>
      <BikeLadySVG class="victimB"/>
      <DogSVG class="victimB"/>
      <CarFrontSVG class="victimB"/>
      <CarBackSVG class="victimB"/>
      <WheelchairSVG class="victimB"/>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import { EventBus } from '@/event-bus.js';
import RoadSVG from "@/assets/svgs/vag.svg";
import ChildSVG from "@/assets/svgs/barn.svg";
import RunningChildSVG from "@/assets/svgs/springbarn.svg";
import MooseSVG from "@/assets/svgs/alg.svg";
import FamilySVG from "@/assets/svgs/familj.svg";
import BikeLadySVG from "@/assets/svgs/cykeldam.svg";
import DogSVG from "@/assets/svgs/hund.svg";
import ManSVG from "@/assets/svgs/man.svg";
import TreeSVG from "@/assets/svgs/trad.svg";
import CarFrontSVG from "@/assets/svgs/bil1.svg";
import CarBackSVG from "@/assets/svgs/bil2.svg";
import WheelchairSVG from "@/assets/svgs/rullstol.svg";

export default {
  name: 'Cars',
  components: {
    RoadSVG,
    ChildSVG,
    RunningChildSVG,
    MooseSVG,
    FamilySVG,
    BikeLadySVG,
    DogSVG,
    ManSVG,
    TreeSVG,
    CarFrontSVG,
    CarBackSVG,
    WheelchairSVG
  },
  props: {
    type: String,
    victims: Array,
    otherVictims: Array
  },
  data: function() {
    return {
      paths: [],
      isMounted: false
    }
  },
  computed: {
    road: function() { 
      if(!this.isMounted) 
        return;
      return this.$refs.road.children[0];
    }
  },
  created: function () {
  },
  mounted: function () { 
    this.isMounted = true;
    this.road.children[2].setAttribute('stroke-width', 0);
    this.road.children[3].setAttribute('stroke-width', 0);
    this.road.children[5].setAttribute('stroke-width', 0);
    this.startPosition();
    EventBus.$on('start-animation', (d) => {
      this.startAnimation(d);
    });
  },
  methods: {
    startPosition: function () {
      let path = anime.path(this.road.children[4]);
      anime({
        targets: '#car',
        translateX: path('x'),
        translateY: path('y'),
        // rotate: path('angle'),
        easing: 'cubicBezier(0.310, 0.020, 0.485, 0.5)',
        duration: 1,
      });
      let path2 = anime.path(this.road.children[6]);
      anime({
        targets: '#car2',
        translateX: path2('x'),
        translateY: path2('y'),
        // rotate: path('angle'),
        easing: 'cubicBezier(0.310, 0.020, 0.485, 0.5)',
        duration: 1,
      });
    },
    startAnimation: function (d) {
      let type = 3;
      if (d===1)
        type = 2;
      let path = anime.path(this.road.children[type]);
      anime({
        targets: '#car',
        translateX: path('x'),
        translateY: path('y'),
        // rotate: path('angle'),
        easing: 'cubicBezier(0.310, 0.020, 0.485, 0.5)',
        duration: 3000,
        complete: function () {
          if (d === 2) {
            anime({
              targets: ['.main'],
              height: '10px',
              //rotate: function() {return anime.random(90,270)},
              backgroundColor: '#900',
              borderRadius:'50px',
              //direction: 'alternate',
              easing: 'easeInOutExpo',
              duration: 100
            });
          }
          else {
            anime({
              targets: ['.other'],
              height: '10px',
              //rotate: function() {return anime.random(90,270)},
              backgroundColor: '#900',
              borderRadius:'50px',
              borderRadius:'100px',
              easing: 'easeInOutExpo',
              duration: 100
            });
          }
        }
      });
      let path2 = anime.path(this.road.children[5]);
      anime({
        targets: '#car2',
        translateX: path2('x'),
        translateY: path2('y'),
        // rotate: path('angle'),
        easing: 'cubicBezier(0.310, 0.020, 0.485, 0.5)',
        duration: 7000,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.page-wrapper {
  width:500px;
  margin: auto;
}
.road-wrapper {
  display: block;
  position: relative;
  width:425px;
  height:410px;
}
#roady {
}
#car {
  position: absolute;
  top: -30px;
  left: 0px;
  width: 60px;
  height: auto;
  z-index: 100;
}

#car path {
  fill: pink;
}

#car2 {
  position: absolute;
  top: -30px;
  left: -30px;
  width: 60px;
  height: auto;
  z-index: 100;
}

#car2 path {
  fill: #116;
}
.victim {
  position: absolute;
  bottom:-15px;
  left:230px;
  transform-origin: 0 100%;
  transform: scale(0.4);
  z-index: 99;
}
.victim path {
  fill: yellow;
  /*height: 200px;*/
}

.other {
  bottom:7px;
  left:105px;
  z-index: 99;
}

.victimB {
  display: none;
}
</style>
