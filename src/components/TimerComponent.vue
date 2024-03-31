<template>
  <div>
    <p>Timer: {{ formattedTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps } from "vue";

const props = defineProps({
  stopTimer: Boolean,
});

const timeElapsed = ref(0);
const formattedTime = ref("00:00");
const emit = defineEmits(["timeInPlay"]);

const formatTime = () => {
  const minutes = Math.floor(timeElapsed.value / 60);
  const seconds = timeElapsed.value % 60;
  formattedTime.value = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  setInterval(() => {
    if (!props.stopTimer) {
      timeElapsed.value++;
      formatTime();
      emit("timeInPlay", formattedTime.value);
    }
  }, 1000);
};

onMounted(startTimer);
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";

p {
  color: $orange;
  margin: 0px;
}
</style>
