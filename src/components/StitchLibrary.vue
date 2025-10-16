<template>
  <div class="bg-base-200 p-4 rounded-lg">
    <h3 class="text-lg font-bold mb-4">Stitch Library</h3>

    <div class="tabs tabs-boxed mb-4">
      <a
        v-for="category in categories"
        :key="category"
        class="tab"
        :class="{ 'tab-active': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ formatCategory(category) }}
      </a>
    </div>

    <div class="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
      <button
        v-for="stitch in filteredStitches"
        :key="stitch.id"
        class="btn btn-sm justify-start"
        :class="{ 'btn-primary': selectedStitchId === stitch.id }"
        @click="$emit('select-stitch', stitch.id)"
        :title="stitch.description"
      >
        <span class="text-2xl mr-2">{{ stitch.symbol }}</span>
        <span class="text-xs truncate">{{ stitch.name }}</span>
      </button>
    </div>

    <div v-if="selectedStitch" class="mt-4 p-3 bg-base-300 rounded">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-4xl">{{ selectedStitch.symbol }}</span>
        <div>
          <div class="font-bold">{{ selectedStitch.name }}</div>
          <div class="text-sm opacity-70">{{ selectedStitch.abbreviation }}</div>
        </div>
      </div>
      <p class="text-sm">{{ selectedStitch.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defaultStitches } from '../data/stitches';
import { StitchCategory } from '../types/stitch';

interface Props {
  selectedStitchId: string | null;
}

const props = defineProps<Props>();

defineEmits<{
  'select-stitch': [stitchId: string];
}>();

const selectedCategory = ref<StitchCategory | 'all'>('all');

const categories = computed(() => ['all' as const, ...Object.values(StitchCategory)]);

const filteredStitches = computed(() => {
  if (selectedCategory.value === 'all') {
    return defaultStitches;
  }
  return defaultStitches.filter(s => s.category === selectedCategory.value);
});

const selectedStitch = computed(() => {
  return defaultStitches.find(s => s.id === props.selectedStitchId);
});

const formatCategory = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};
</script>
