<template>
  <section ref="winnerModal" class="winner-modal">
    <div>
      <h1>✨ You're the winner! ✨</h1>
    </div>
    <div>
      <button @click="emit('playAgain')">Play Again</button>
    </div>
  </section>
</template>

<script setup>
import { defineEmits, onMounted } from "vue";
import anime from "animejs/lib/anime.es.js";
const emit = defineEmits(["playAgain"]);

const animateWinnerModal = () => {
  anime({
    targets: ".winner-modal",
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
  });
};

onMounted(() => {
  animateWinnerModal();
});
</script>

<style lang="scss">
@import "../assets/styles/colors.scss";

.winner-modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000036;
  backdrop-filter: blur(9px);
  opacity: 0;
  transform: translateY(-100px);
}

h1 {
  color: $orange;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $dark-gray;
  color: $white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: $medium-gray;
}
</style>
