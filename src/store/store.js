import { defineStore } from "pinia";

const initialState = {
  records_board: [],
  currentUser: {
    nickName: "",
  },
};

export const useCounterStore = defineStore("user_memory", {
  state: () => initialState,
  getters: {
    records: (state) => state.records_board,
    user: (state) => state.currentUser,
  },
  actions: {
    reset_board() {
      return "Board will be reset";
    },
    add_user(username) {
      this.currentUser.nickName = username;
      return "User has being created";
    },
    add_to_records_board(time, movements) {
      this.records_board.push({
        name: this.currentUser.nickName,
        time,
        movements,
      });
      return "User has being created";
    },
  },
});
