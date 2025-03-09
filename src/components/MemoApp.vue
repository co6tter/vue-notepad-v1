<script setup lang="ts">
import { ref } from "vue";
import { useMemoStore } from "@/stores/memo";

const store = useMemoStore();
const newMemo = ref("");

const add = () => {
  if (newMemo.value.trim()) {
    store.addMemo(newMemo.value.trim());
    newMemo.value = "";
  }
};
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold">メモ帳</h1>
    <input
      v-model="newMemo"
      @keyup.enter="add"
      class="w-full mt-2 p-2 border rounded"
      placeholder="メモを入力"
    />
    <p class="mt-2 text-sm text-gray-400">メモ数: {{ store.memoCount }}</p>
    <ul class="flex flex-col gap-2 mt-2">
      <li
        v-for="(memo, index) in store.memos"
        :key="index"
        class="bg-gray-100 p-2 rounded flex justify-between"
      >
        <span>{{ memo }}</span>
        <button @click="store.deleteMemo(index)" class="text-red-400">
          削除
        </button>
      </li>
    </ul>
  </div>
</template>
