<template>
  <div class="bg-base-100 p-4 rounded-lg overflow-auto">
    <div class="inline-block">
      <table class="border-collapse" :style="{ fontSize: `${cellSize}px` }">
        <tbody>
          <tr v-for="row in rows" :key="row" class="border-0">
            <td class="text-xs text-center pr-2 text-base-content/50 w-8">
              {{ row }}
            </td>
            <td
              v-for="col in cols"
              :key="col"
              class="border border-base-content/20 text-center cursor-pointer select-none transition-colors hover:bg-primary/10"
              :class="{
                'bg-primary/20': isCellSelected(row - 1, col - 1),
                'bg-base-200': (row + col) % 2 === 0 && !isCellSelected(row - 1, col - 1),
              }"
              :style="{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                minWidth: `${cellSize}px`,
                minHeight: `${cellSize}px`,
              }"
              @click="handleCellClick(row - 1, col - 1)"
              @mousedown.prevent="handleMouseDown(row - 1, col - 1)"
              @mouseenter="handleMouseEnter(row - 1, col - 1)"
              @mouseup="handleMouseUp"
            >
              <span v-if="getCellStitch(row - 1, col - 1)" class="inline-block leading-none">
                {{ getCellStitch(row - 1, col - 1) }}
              </span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td
              v-for="col in cols"
              :key="`col-${col}`"
              class="text-xs text-center pt-2 text-base-content/50"
            >
              {{ col }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defaultStitches } from '../data/stitches';

interface Props {
  rows: number;
  cols: number;
  cells: Array<{ row: number; col: number; stitchId: string | null }>;
  selectedStitchId: string | null;
  cellSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cellSize: 40,
});

const emit = defineEmits<{
  'cell-click': [row: number, col: number];
  'cell-paint': [row: number, col: number];
  'selection-change': [cells: Array<{ row: number; col: number }>];
}>();

const isDrawing = ref(false);
const selectedCells = ref<Set<string>>(new Set());

const getCellKey = (row: number, col: number) => `${row}-${col}`;

const getCellStitch = (row: number, col: number) => {
  const cell = props.cells.find(c => c.row === row && c.col === col);
  if (!cell || !cell.stitchId) return '';
  const stitch = defaultStitches.find(s => s.id === cell.stitchId);
  return stitch?.symbol || '';
};

const isCellSelected = (row: number, col: number) => {
  return selectedCells.value.has(getCellKey(row, col));
};

const handleCellClick = (row: number, col: number) => {
  emit('cell-click', row, col);
};

const handleMouseDown = (row: number, col: number) => {
  isDrawing.value = true;
  emit('cell-paint', row, col);
};

const handleMouseEnter = (row: number, col: number) => {
  if (isDrawing.value) {
    emit('cell-paint', row, col);
  }
};

const handleMouseUp = () => {
  isDrawing.value = false;
};
</script>
