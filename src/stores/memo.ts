import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

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
    editMemo(index: number, newText: string) {
      if (index >= 0 && index < this.memos.length) {
        this.memos[index] = newText;
      }
    },
    deleteMemo(index: number) {
      this.memos.splice(index, 1);
    },
  },
});
