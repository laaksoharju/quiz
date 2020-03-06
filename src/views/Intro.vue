<template>
  <div class="wrapper">
    <h2>FRÅGESPORT</h2>
    <h1>APPARATERS EFFEKTANVÄNDNING</h1>
    <p>
      Det här är en tävling mellan två deltagare. Båda får två knappar var att välja svarsalternativ med.
    </p>
    <p>
      Ni kommer att få se två bilder på vanliga hushållsapparater. Er uppgift är att avgöra vilken av dessa som har högst effektanvändning, eller enklare uttryckt, vilken som använder mest el när de är igång.
    </p>
    <p>
      Om ni tror att det är den vänstra apparaten så trycker ni på gul knapp och om ni tror att det är den högra apparaten trycker ni på blå knapp.
    </p>
    <p>
      Bara den som är först med att svara rätt får poäng så det är värt att vara snabb. Men var inte för snabb för om du svarar fel så får du minuspoäng!
    </p>
    <p>
      Starta tävlingen genom att trycka på "Nästa"!
    </p>
  </div>
</template>
<script>
import { EventBus } from '@/event-bus.js';

export default {
  name: 'Quiz',
  data: function () {
    return {
      delayFlag: false
    }
  },
  mounted: function () {
    this.delayFlag = false;
    setTimeout(function() {
      this.delayFlag = true;
    }.bind(this),2000);
      EventBus.$on('next-question', () => {
        if (this.delayFlag)
          this.$router.push("quiz");
      });
}
}
</script>
<style>

p {
  margin: 1em auto;
}
.wrapper {
  width: 40em;
  max-width: 40em;
  margin: auto;
}
</style>