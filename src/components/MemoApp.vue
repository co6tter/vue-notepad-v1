<script setup lang="ts">
import { ref, computed } from "vue";
import { useMemoStore } from "@/stores/memo";
import { useCategoryStore } from "@/stores/category";
import { useWindowSize } from "@vueuse/core";

const store = useMemoStore();
const categoryStore = useCategoryStore();
const newMemo = ref("");
const selectedCategory = ref(categoryStore.categories[0]);
const priority = ref("medium");
const draggingIndex = ref<number | null>(null);
const searchQuery = ref("");

const { width } = useWindowSize();

const priorityIcons = {
  high: "🔴",
  medium: "🟡",
  low: "🔵",
};

const isPriority = (
  priority: string
): priority is "high" | "medium" | "low" => {
  return ["high", "medium", "low"].includes(priority);
};

const getPriorityIcon = (priority: "high" | "medium" | "low") =>
  priorityIcons[priority] || "";

const filteredMemos = computed(() => {
  if (!searchQuery.value) {
    return store.memos;
  }
  return store.memos.filter((memo) =>
    memo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const add = () => {
  if (newMemo.value.trim()) {
    store.addMemo(newMemo.value.trim(), selectedCategory.value, priority.value);
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
  <div class="p-4 mx-auto max-w-md">
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
    <div class="flex flex-col">
      <label for="priority" class="mt-2 text-gray-600">優先度</label>
      <select id="priority" v-model="priority" class="p-2 border rounded">
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
    </div>
    <input
      v-model="searchQuery"
      class="w-full mt-8 p-2 border rounded"
      placeholder="メモを検索"
    />
    <p class="mt-2 text-sm text-gray-400">
      メモ数: {{ filteredMemos.length ?? 0 }}
    </p>
    <ul class="flex flex-col gap-2 mt-2">
      <li
        v-for="(memo, index) in filteredMemos"
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
            v-if="width >= 448"
            class="text-sm text-gray-400 border border-gray-400 rounded px-1"
            >{{ memo.category }}</span
          >
          <span v-if="isPriority(memo.priority) && width >= 448">{{
            getPriorityIcon(memo.priority)
          }}</span>
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
