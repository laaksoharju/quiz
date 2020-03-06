<template>
  <div>
    <div class="score-sheet">
      <div class="player-score player1">
        {{player1}}
      </div>
      <div class="player-score player2">
        {{player2}}
      </div>
    </div>
    <div class="grid">
      <div class="cell left">
        <img :src="img1">
      </div>
      <div class="cell right">
        <img :src="img2">
      </div>
    </div>
    <div :class="['overlay', feedbackColor]" v-show="answered">
      <p>
        {{correctFeedback}}
      </p>
      <p>
        {{ explanation }}
      </p>
      <p>
        Tryck på "Nästa" för att fortsätta.
      </p>
    </div>
    <div :class="['overlay', feedbackColor]" v-show="end > 0">
      <h1>
        Grattis spelare {{end}}!!!
      </h1>
      <p>
        Du kan uppenbarligen mest om hushållsapparaters effektanvändning! Eller var du kanske bara snabbast på att svara? :-)
      </p>
      <p>
        Tryck på "Nästa" för att avsluta.
      </p>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/event-bus.js';

export default {
  name: 'Quiz',
  data: function() {
    return {
      img1: "",
      img2: "",
      player1: 0,
      player2: 0,
      correct: 2,
      correctFeedback: "",
      feedbackColor: "",
      answered: false,
      end: 0,
      explanation: "",
      questions: [{ i1: "toaster", 
        i2: "laptop",
        correct: 1,
        explanation: "Vanliga brödrostar använder mellan 800W och 1500W medan de flesta bärbara datorer använder mellan 20W och 65W."
      },
      { i1: "refrigerator", 
        i2: "washing_machine",
        correct: 2,
        explanation: "Tvättmaskiner använder mellan 1200W och 3000W medan kylskåp använder mellan 40W och 120W. Observera att kylskåp är igång hela tiden och därför ändå bidrar mycket till total elanvändning."
      },
      { i1: "fan", 
        i2: "hairdryer",
        correct: 2,
        explanation: "Bordsfläktar använder typiskt mindre än 50W medan hårtorkar i genomsnitt använder 2000W. Fläktar står dock på längre stunder medan hårtorkar ju används så kort tid som möjligt."
      },
      { i1: "kettle", 
        i2: "computer_pc",
        correct: 1,
        explanation: "Vattenkokare är riktiga effektmonster och kan använda upp till 3000W. Stationära datorer använder normalt runt 400W. Gamingdatorer kan i extrema fall nå över 800W. Observera att vattenkokare sällan används lika länge som datorer och att de utför uppgiften att värma upp vatten väldigt effektivt."
      },
      { i1: "tv", 
        i2: "vacuum_cleaner",
        correct: 2,
        explanation: "De flesta moderna TV-apparater använder mellan 30W och 200W beroende på storlek medan dammsugare använder mellan 500W och 1500W, bland annat beroende på sugkraft."
      },
      { i1: "sony_playstation", 
        i2: "microwave",
        correct: 2,
        explanation: "Sony Playstation använder upp till 165W medan normalstora mikrovågsugnar använder mellan 800W och 1800W. Men antagligen använder du inte micron lika länge som du spelar..."
      },
      { i1: "iron", 
        i2: "smartphone",
        correct: 1,
        explanation: "Strykjärn använder mellan 1000W och 1800W medan mobiltelefoner ofta använder mindre än 5W."
      }
      ]
    }
  },
  mounted: function () {
    this.nextQuestion();
    EventBus.$on('player-response', (d) => {
      if (this.end === 0) {
          this.registerScore(d);
        }
    });
    EventBus.$on('next-question', () => {
        if (this.end > 0) {
          this.$router.push("/");
        }
        else {
          if (this.answered) {
              this.nextQuestion();
            }
        }
    });

    
  },
  methods: {
    nextQuestion() {
      this.answered = false;
      if (this.questions.length === 0) {
        if (this.player1 > this.player2) {
          this.end = 1;
          this.feedbackColor = "player1"; 
        }
        else if (this.player1 < this.player2) {
          this.end = 2;
          this.feedbackColor = "player2";
        }
        else {
          this.feedbackColor = "neutral";
        }
        
      }
      else {
        let i = Math.floor(Math.random() * this.questions.length);
        let flip = 1, imgFlip = ["i1", "i2"];
        if (Math.random() > 0.5)
          flip = 2;
        this.img1 = require("@/assets/images/" + this.questions[i][imgFlip[flip-1]] + ".png");
        this.img2 = require("@/assets/images/" + this.questions[i][imgFlip[flip%2]] + ".png");

        this.correct = (this.questions[i].correct * flip) % 3;
        this.explanation = this.questions[i].explanation;
        this.questions.splice(i,1);
      }
    },
    registerScore(d) {
      if (this.answered === false) {
        if (d.answer === this.correct) {
          this["player" + d.player] += 1;
          this.correctFeedback = "Spelare " + d.player + " svarade rätt!"
        }
        else {
          this["player" + d.player] -= 1;
          this.correctFeedback = "Spelare " + d.player + " svarade tyvärr fel!"
        }
        this.feedbackColor = "player" + d.player;
        this.answered = true;
      }
    }
  }
} 
</script>
<style>
  .grid {
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh;
  }

  .grid img {
    max-width: 45vw;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left {
    background-color: yellow;
  }
  .right {
    background-color: lightblue;
  }
  .score-sheet {
    position: absolute;
    top:1em;
    left: 0;
    z-index: 2;
    width:10em;
  }
  .player-score {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width:2em;
    height:2em;
    padding:0.5em;
    border-radius: 5em;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    margin-left: 1em;
  }
  .player1 {
    background-color: deeppink;
  }
  .player2 {
    background-color: limegreen;
  }
  .neutral {
    background-color: darkgray;
  }
  .overlay {
    position: absolute;
    top:55vh;
    width: 30em;
    left:calc(50vw - 15em);
    z-index: 2;
    color: beige;
    padding: 0 1em;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5)
  }
</style>