<template>
  <div class="navbar bg-base-300 rounded-lg mb-4">
    <div class="flex-1 gap-2">
      <button class="btn btn-sm btn-ghost" @click="$emit('new-chart')" title="New Chart">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New
      </button>

      <button class="btn btn-sm btn-ghost" @click="handleImport" title="Import Chart">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Import
      </button>

      <button class="btn btn-sm btn-ghost" @click="$emit('export-chart')" title="Export Chart">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        Export
      </button>

      <div class="divider divider-horizontal mx-0"></div>

      <button
        class="btn btn-sm"
        :class="{ 'btn-primary': tool === 'paint' }"
        @click="$emit('tool-change', 'paint')"
        title="Paint Tool"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-primary': tool === 'erase' }"
        @click="$emit('tool-change', 'erase')"
        title="Erase Tool"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <div class="divider divider-horizontal mx-0"></div>

      <button class="btn btn-sm btn-ghost" @click="$emit('clear-chart')" title="Clear All">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Clear
      </button>
    </div>

    <div class="flex-none gap-2">
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <span class="label-text text-xs">Show Grid</span>
          <input type="checkbox" class="toggle toggle-sm" :checked="showGrid" @change="$emit('toggle-grid')" />
        </label>
      </div>

      <input
        type="file"
        ref="fileInput"
        accept=".json"
        class="hidden"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  tool: 'paint' | 'erase';
  showGrid: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'new-chart': [];
  'export-chart': [];
  'import-chart': [file: File];
  'tool-change': [tool: 'paint' | 'erase'];
  'toggle-grid': [];
  'clear-chart': [];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const handleImport = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit('import-chart', file);
    target.value = '';
  }
};
</script>
