<template>
  <section
    ref="modal"
    :class="{ active: showModal, hidden: !showModal }"
    class="modal"
  >
    <div class="modal-content">
      <div>
        <h3>
          Welcome, this is a very simple memorize game but hope you like it!
        </h3>
      </div>

      <div class="modal-controls">
        <input type="text" v-model="playerName" placeholder="Enter your name" />
        <select v-model="selectedOption" @change="difficultyValue">
          <option value="" selected disabled hidden>
            Choose Difficulty here!
          </option>
          <option :value="16">Easy - 4x4</option>
          <option :value="36">Medium - 6x6</option>
          <option :value="64">Hard - 8x8</option>
        </select>
        <button @click="startGame">Start Game</button>
      </div>
      <p class="error-message" v-if="showErrorMessage">
        Hey, you're missing some fields bro!
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, defineEmits, watch, defineProps, onMounted } from "vue";
import anime from "animejs/lib/anime.es.js";

const emit = defineEmits(["startGame", "difficulty"]);
const props = defineProps(["showModal"]);

const selectedOption = ref("");
const playerName = ref("");
const showErrorMessage = ref(false);

const startGame = () => {
  if (selectedOption.value && playerName.value) {
    emit("startGame", playerName.value);
    showErrorMessage.value = false;
    return;
  }
  showErrorMessage.value = true;
};

const difficultyValue = () => {
  emit("difficulty", selectedOption.value);
};

onMounted(() => {
  animateModalIn();
});

const animateModalIn = () => {
  anime({
    targets: ".modal-content",
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
  });
};

const animateModalOut = () => {
  anime({
    targets: ".modal-content",
    opacity: [1, 0],
    duration: 500,
    easing: "easeInOutQuad",
    complete: () => {
      emit("update:showModal", false);
    },
  });
};

watch(
  () => props.showModal,
  (newValue) => {
    if (newValue) {
      animateModalIn();
    } else {
      animateModalOut();
    }
  }
);
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";
.error {
  &-message {
    color: $red;
    text-align: center;
  }
}

.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $modal-background;
  backdrop-filter: blur(16px);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.active {
  position: fixed;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.hidden {
  display: none;
  z-index: -10;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.modal-content {
  width: 80%;
  max-width: 500px;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: $white-50;
}

.modal-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > * {
    margin: 8px 0;
  }
}

button {
  width: 170px;
  height: 35px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: $dark-gray;
  color: $white;
  opacity: 0.8;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

select,
input {
  width: -webkit-fill-available;
  height: 35px;
  padding: 5px;
  border: 1px solid $white;
  border-radius: 3px;
}

input::placeholder {
  color: gray;
}

.hidden {
  z-index: -10;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
