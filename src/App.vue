<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-4">
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">Knitting Chart Editor</h1>
        <p class="text-sm opacity-70">Design professional knitting charts with ease</p>
      </div>

      <Toolbar
        :tool="currentTool"
        :show-grid="showGrid"
        @new-chart="handleNewChart"
        @export-chart="handleExport"
        @import-chart="handleImport"
        @tool-change="currentTool = $event"
        @toggle-grid="showGrid = !showGrid"
        @clear-chart="handleClearChart"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-3">
          <StitchLibrary
            :selected-stitch-id="selectedStitchId"
            @select-stitch="handleSelectStitch"
          />
        </div>

        <div class="lg:col-span-6">
          <ChartGrid
            :rows="chart.rows"
            :cols="chart.cols"
            :cells="chart.cells"
            :selected-stitch-id="selectedStitchId"
            :cell-size="cellSize"
            @cell-click="handleCellClick"
            @cell-paint="handleCellPaint"
          />
        </div>

        <div class="lg:col-span-3">
          <ChartProperties
            :name="chart.name"
            :rows="tempRows"
            :cols="tempCols"
            :cell-size="cellSize"
            :filled-cells="chart.cells.length"
            :gauge="chart.gauge"
            @update:name="chart.name = $event"
            @update:rows="tempRows = $event"
            @update:cols="tempCols = $event"
            @update:cell-size="cellSize = $event"
            @update:gauge="chart.gauge = $event"
            @resize-chart="handleResizeChart"
          />
        </div>
      </div>
    </div>

    <dialog ref="newChartDialog" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Create New Chart</h3>
        <div class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Rows</span>
            </label>
            <input
              type="number"
              v-model.number="newChartRows"
              class="input input-bordered"
              min="1"
              max="100"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Columns</span>
            </label>
            <input
              type="number"
              v-model.number="newChartCols"
              class="input input-bordered"
              min="1"
              max="100"
            />
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="closeNewChartDialog">Cancel</button>
          <button class="btn btn-primary" @click="confirmNewChart">Create</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChart } from './composables/useChart';
import StitchLibrary from './components/StitchLibrary.vue';
import ChartGrid from './components/ChartGrid.vue';
import ChartProperties from './components/ChartProperties.vue';
import Toolbar from './components/Toolbar.vue';

const {
  chart,
  selectedStitchId,
  initializeChart,
  setCell,
  clearCell,
  exportChart,
  importChart,
} = useChart();

const currentTool = ref<'paint' | 'erase'>('paint');
const showGrid = ref(true);
const cellSize = ref(40);
const tempRows = ref(chart.value.rows);
const tempCols = ref(chart.value.cols);

const newChartDialog = ref<HTMLDialogElement | null>(null);
const newChartRows = ref(20);
const newChartCols = ref(20);

const handleSelectStitch = (stitchId: string) => {
  selectedStitchId.value = stitchId;
  currentTool.value = 'paint';
};

const handleCellClick = (row: number, col: number) => {
  if (currentTool.value === 'paint' && selectedStitchId.value) {
    setCell(row, col, selectedStitchId.value);
  } else if (currentTool.value === 'erase') {
    clearCell(row, col);
  }
};

const handleCellPaint = (row: number, col: number) => {
  if (currentTool.value === 'paint' && selectedStitchId.value) {
    setCell(row, col, selectedStitchId.value);
  } else if (currentTool.value === 'erase') {
    clearCell(row, col);
  }
};

const handleNewChart = () => {
  newChartDialog.value?.showModal();
};

const closeNewChartDialog = () => {
  newChartDialog.value?.close();
};

const confirmNewChart = () => {
  initializeChart(newChartRows.value, newChartCols.value);
  tempRows.value = newChartRows.value;
  tempCols.value = newChartCols.value;
  closeNewChartDialog();
};

const handleResizeChart = () => {
  if (tempRows.value > 0 && tempCols.value > 0) {
    chart.value.rows = tempRows.value;
    chart.value.cols = tempCols.value;
  }
};

const handleClearChart = () => {
  if (confirm('Are you sure you want to clear all stitches from the chart?')) {
    chart.value.cells = [];
  }
};

const handleExport = () => {
  exportChart();
};

const handleImport = async (file: File) => {
  const success = await importChart(file);
  if (success) {
    tempRows.value = chart.value.rows;
    tempCols.value = chart.value.cols;
    alert('Chart imported successfully!');
  } else {
    alert('Failed to import chart. Please check the file format.');
  }
};

initializeChart(20, 20);
</script>
