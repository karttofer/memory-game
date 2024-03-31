<template>
  <div v-if="openLeaderBoardModal" class="leaderboard">
    <div>
      <h2>Leaderboard</h2>
      <table v-if="leaderboardData.length">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
            <th>Movements</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in sortedLeaderboard" :key="player.id">
            <td>{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.time }}</td>
            <td>{{ player.movements }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>There aren't any winners today</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { useCounterStore } from "@/store/store";

defineProps({
  openLeaderBoardModal: Boolean,
});

const store = useCounterStore();

const leaderboardData = ref(store.records);

const sortedLeaderboard = computed(() =>
  leaderboardData.value.slice().sort((a, b) => {
    if (a.movements !== b.movements) {
      return a.movements - b.movements;
    } else {
      return a.time - b.time;
    }
  })
);
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";

p {
  color: $black;
  margin: 0px 0px 70px 0px;
  text-align: center;
}

h2 {
  text-align: center;
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
