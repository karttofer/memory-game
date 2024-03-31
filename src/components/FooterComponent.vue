<template>
  <section class="memorize-footer-container">
    <div class="memorize-footer-buttons">
      <button @click="openMenu">Open Menu</button>
      <button @click="resetGame">Suffle</button>
    </div>
  </section>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["resetGame", "openMenu"]);

const resetGame = () => {
  emit("resetGame");
};

const openMenu = () => {
  emit("openMenu");
};
</script>

<style lang="scss">
.memorize-footer {
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-sound-effect {
    width: fit-content;
    opacity: 0.3;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 1;
      transition: all 0.2s;
    }
  }

  &-buttons {
    button {
      padding: 10px;
      margin: 4px;
      border: none;
      border-radius: 2px;
      background: #282828;
      color: white;
      opacity: 0.3;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        opacity: 1;
        transition: all 0.2s;
      }
    }
  }
}
</style>
