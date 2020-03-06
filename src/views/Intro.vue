<template>
  <div class="wrapper">
    <h1>VILKEN APPARAT ANVÄNDER MEST EL?</h1>
    <p>
      Det här är en tävling mellan två deltagare med två svarsalternativ.
    </p>
    <p>
      Bara den som är först med att svara rätt får poäng så det är värt att vara snabb. Men var inte för snabb för om du svarar fel så får du minuspoäng!
    </p>
    <h2>HUR FUNGERAR DET?</h2>
    <p>
      Ni kommer att få se två bilder på vanliga hushållsapparater. Er uppgift är att avgöra vilken av dessa som har högst effektanvändning, eller enklare uttryckt, vilken som använder mest el när den är igång.
    </p>
    <h2>HUR GÖR JAG?</h2>
    <ul>
      <li>Håll en hand på folieremsan närmast bordskanten. Hela tiden.</li>
      <li>Om du tror att det är den vänstra apparaten så trycker ni på vänstra "folieknappen" på din spelarmatta och om du tror att det är den högra apparaten trycker du på den högra.</li>
    </ul>
    <p>
      Starta tävlingen genom att trycka på "NÄSTA"!
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