<template>
  <div v-if="openLeaderBoardModal" class="leaderboard">
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
            <th>Movements</th>
          </tr>
        </thead>
        <tbody v-if="leaderboardData.length">
          <tr v-for="(player, index) in leaderboardData" :key="player.id">
            <td>{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.time }}</td>
            <td>{{ player.movements }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useCounterStore } from "@/store/store";

defineProps({
  openLeaderBoardModal: Boolean,
});

const store = useCounterStore();

const leaderboardData = store.records;
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";

.leaderboard {
  padding: 10px 0px 10px 0px;
}

h2 {
  color: $black;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid $white-100;
  padding: 8px;
  text-align: left;
  background: $white;
}

th {
  background-color: $white-50;
}

tr:nth-child(even) {
  background-color: $white-50;
}
</style>
