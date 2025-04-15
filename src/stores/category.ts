import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: ["仕事", "プライベート", "その他"] as string[],
  }),
  actions: {
    addCategory(category: string) {
      if (!this.categories.includes(category)) {
        this.categories.push(category);
      }
    },
  },
});
