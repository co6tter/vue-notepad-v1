import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useMemoStore = defineStore("memo", {
  state: () => ({
    memos: useLocalStorage<string[]>("memos", []),
  }),
  getters: {
    memoCount: (state) => state.memos.length,
  },
  actions: {
    addMemo(memo: string) {
      this.memos.push(memo);
    },
    deleteMemo(index: number) {
      this.memos.splice(index, 1);
    },
  },
});
