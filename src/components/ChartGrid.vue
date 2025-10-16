<template>
  <div class="bg-base-100 p-4 rounded-lg overflow-auto">
    <div class="inline-block">
      <div class="grid gap-0 border border-base-content/20" :style="gridStyle">
        <!-- 行号 -->
        <div v-for="row in rows" :key="`row-${row}`"
          class="text-xs text-center flex items-center justify-center text-base-content/50 bg-base-200"
          :style="{ gridColumn: '1', gridRow: `${row + 1}` }">
          {{ row }}
        </div>

        <!-- 列号 -->
        <div v-for="col in cols" :key="`col-${col}`"
          class="text-xs text-center flex items-center justify-center text-base-content/50 bg-base-200"
          :style="{ gridColumn: `${col + 1}`, gridRow: '1' }">
          {{ col }}
        </div>

        <!-- 图表格子 -->
        <div v-for="(cell, _index) in visibleCells" :key="`cell-${cell.row}-${cell.col}`"
          class="border border-base-content/20 cursor-pointer select-none transition-colors hover:bg-primary/10 flex items-center justify-center"
          :class="{
            'bg-primary/20': isCellSelected(cell.row, cell.col),
            'bg-base-200': (cell.row + cell.col) % 2 === 0 && !isCellSelected(cell.row, cell.col),
            'multi-cell-stitch': cell.cellType === 'primary' && getStitchWidth(cell) > 1,
          }" :style="getCellStyle(cell)" @click="handleCellClick(cell.row, cell.col)"
          @mousedown.prevent="handleMouseDown(cell.row, cell.col)" @mouseenter="handleMouseEnter(cell.row, cell.col)"
          @mouseup="handleMouseUp">
          <StitchSymbol v-if="cell.cellType === 'primary'" :stitch-id="cell.stitchId" :size="cellSize * 0.8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defaultStitches } from '../data/stitches';
import StitchSymbol from './stitches/StitchSymbol.vue';
import type { ChartCell } from '../types/stitch';

interface Props {
  rows: number;
  cols: number;
  cells: ChartCell[];
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

// 计算网格样式
const gridStyle = computed(() => ({
  gridTemplateColumns: `40px repeat(${props.cols}, ${props.cellSize}px)`,
  gridTemplateRows: `40px repeat(${props.rows}, ${props.cellSize}px)`,
}));

// 只显示实际存在的格子
const visibleCells = computed(() => {
  return props.cells.filter(cell => cell.cellType !== 'empty' ||
    !props.cells.some(c =>
      c.cellType === 'primary' &&
      c.row <= cell.row &&
      c.col <= cell.col &&
      c.row + (defaultStitches.find(s => s.id === c.stitchId)?.height || 1) > cell.row &&
      c.col + (defaultStitches.find(s => s.id === c.stitchId)?.width || 1) > cell.col
    )
  );
});

// 获取格子样式
const getCellStyle = (cell: ChartCell) => {
  const stitch = cell.cellType === 'primary' && cell.stitchId ?
    defaultStitches.find(s => s.id === cell.stitchId) : null;

  return {
    gridColumn: `${cell.col + 2} / span ${stitch?.width || 1}`,
    gridRow: `${cell.row + 2} / span ${stitch?.height || 1}`,
    width: `${props.cellSize * (stitch?.width || 1)}px`,
    height: `${props.cellSize * (stitch?.height || 1)}px`,
    minWidth: `${props.cellSize * (stitch?.width || 1)}px`,
    minHeight: `${props.cellSize * (stitch?.height || 1)}px`,
  };
};

const isCellSelected = (row: number, col: number) => {
  return selectedCells.value.has(getCellKey(row, col));
};

const getStitchWidth = (cell: ChartCell) => {
  if (cell.cellType !== 'primary' || !cell.stitchId) return 1;
  const stitch = defaultStitches.find(s => s.id === cell.stitchId);
  return stitch?.width || 1;
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

<style scoped>
.multi-cell-stitch {
  border: 2px solid currentColor;
  background: linear-gradient(135deg, rgba(var(--p), 0.1) 0%, rgba(var(--p), 0.05) 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.multi-cell-stitch:hover {
  background: linear-gradient(135deg, rgba(var(--p), 0.2) 0%, rgba(var(--p), 0.1) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
