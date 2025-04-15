import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

interface Memo {
  text: string;
  completed: boolean;
  category: string;
}

export const useMemoStore = defineStore("memo", {
  state: () => ({
    memos: useLocalStorage<Memo[]>("memos", []),
  }),
  getters: {
    memoCount: (state) => state.memos.length,
  },
  actions: {
    addMemo(text: string, category: string) {
      this.memos.push({ text, completed: false, category });
    },
    editMemo(index: number, newText: string) {
      if (index >= 0 && index < this.memos.length) {
        this.memos[index].text = newText;
      }
    },
    deleteMemo(index: number) {
      this.memos.splice(index, 1);
    },
    toggleMemoCompletion(index: number) {
      if (index >= 0 && index < this.memos.length) {
        this.memos[index].completed = !this.memos[index].completed;
      }
    },
  },
});
