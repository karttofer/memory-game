<template>
  <div class="memory-card" @click="selectCard" ref="card">
    <div class="memory-card-inner">
      <div
        class="memory-card-front"
        :style="{
          opacity: visible ? 1 : 0,
          transform: visible ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }"
      >
        <img
          src="../../public/images/card-hidde-figures/back-card.svg"
          alt="Game Card"
        />
      </div>
      <div
        class="memory-card-back"
        :style="{
          opacity: visible ? 0 : 1,
          transform: visible ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        }"
      >
        <img
          :src="require(`../../public/images/card-hidde-figures/${value}`)"
          alt="Game Card"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import anime from "animejs/lib/anime.es.js";
import soundEffectFlip from "@/assets/sounds/flip-card-sound-effect.mp3";
const props = defineProps({
  matched: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["select-card"]);
let playing = false;
const cardRef = ref(null);

const selectCard = () => {
  var audio = new Audio(soundEffectFlip);
  audio.playbackRate = 2;

  if (playing) return;

  if (!props.matched) {
    playing = true;
    audio.play();
    anime({
      targets: cardRef.value,
      rotateY: { value: "+=180", easing: "easeInOutSine" },
      duration: 200,
      complete: function () {
        playing = false;
        emits("select-card", {
          position: props.position,
          faceValue: props.value,
        });
      },
    });
  }
};
</script>

<style scoped lang="scss">
.memory {
  &-card {
    * {
      border-radius: 15px;
    }

    width: 76px;
    height: 76px;
    margin: 5px;
    perspective: 1000px;
    border-radius: 15px;
    transition: all 0.2s;

    &:hover {
      filter: drop-shadow(2px 4px 6px black);
      transition: all 0.2s;
    }

    &-inner {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
    }

    &-front,
    &-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: opacity 0.1s, transform 0.1s;

      img {
        cursor: pointer;
      }
    }

    &-back {
      transform: rotateY(180deg);
    }
  }
}
</style>
