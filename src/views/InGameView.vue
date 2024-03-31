<template>
  <div class="home">
    <BoardComponent />
  </div>
</template>

<script>
import BoardComponent from "@/components/BoardComponent.vue";

export default {
  name: "HomeView",
  components: {
    BoardComponent,
  },
};
</script>
