<template>
  <BoardComponent />
  <Leaderboard :open-leader-board-modal="true" />
</template>

<script setup>
import BoardComponent from "@/components/BoardComponent.vue";
import Leaderboard from "@/components/LeaderBoards.vue";
</script>
<style lang="scss">
.in {
  &-game {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
