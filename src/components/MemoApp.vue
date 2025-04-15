<script setup lang="ts">
import { ref } from "vue";
import { useMemoStore } from "@/stores/memo";
import { useCategoryStore } from "@/stores/category";

const store = useMemoStore();
const categoryStore = useCategoryStore();
const newMemo = ref("");
const selectedCategory = ref(categoryStore.categories[0]);
const draggingIndex = ref<number | null>(null);

const add = () => {
  if (newMemo.value.trim()) {
    store.addMemo(newMemo.value.trim(), selectedCategory.value);
    newMemo.value = "";
  }
};

const onDragStart = (index: number) => {
  draggingIndex.value = index;
};

const onDragOver = (event: DragEvent, index: number) => {
  event.preventDefault();
  if (draggingIndex.value === null) {
    return;
  }

  const overIndex = index;
  if (draggingIndex.value === overIndex) {
    return;
  }

  const newMemos = [...store.memos];
  const [removed] = newMemos.splice(draggingIndex.value, 1);
  newMemos.splice(overIndex, 0, removed);

  store.memos = newMemos;
  draggingIndex.value = overIndex;
};

const onDragEnd = () => {
  draggingIndex.value = null;
};

const edit = (index: number, text: string) => {
  const newText = prompt("メモを編集", text);
  if (newText?.trim()) {
    store.editMemo(index, newText.trim());
  }
};
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold text-gray-600">メモ帳</h1>
    <input
      v-model="newMemo"
      @keyup.enter="add"
      class="w-full mt-2 p-2 border rounded"
      placeholder="メモを入力"
    />
    <div class="flex flex-col">
      <label for="category" class="mt-2 text-gray-600">カテゴリ</label>
      <select
        id="category"
        v-model="selectedCategory"
        class="p-2 border rounded"
      >
        <option
          v-for="category in categoryStore.categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <p class="mt-8 text-sm text-gray-400">メモ数: {{ store.memoCount }}</p>
    <ul class="flex flex-col gap-2 mt-2">
      <li
        v-for="(memo, index) in store.memos"
        :key="index"
        class="bg-gray-100 p-2 rounded flex justify-between"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver($event, index)"
        @dragend="onDragEnd"
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            :checked="memo.completed"
            @change="store.toggleMemoCompletion(index)"
          />
          <span :class="{ 'line-through': memo.completed }">{{
            memo.text
          }}</span>
          <span
            class="text-sm text-gray-400 border border-gray-400 rounded px-1"
            >{{ memo.category }}</span
          >
        </div>
        <div>
          <button
            @click="edit(index, memo.text)"
            class="text-blue-400 cursor-pointer mr-2"
          >
            編集
          </button>
          <button
            @click="store.deleteMemo(index)"
            class="text-red-400 cursor-pointer"
          >
            削除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
