import { ref } from 'vue';
import type { Chart, ChartCell, SerializedChart } from '../types/stitch';
import { initializeChart as initChartCells, placeStitch, removeStitch } from '../utils/chartUtils';

export function useChart() {
  const chart = ref<Chart>({
    rows: 20,
    cols: 20,
    cells: [],
    name: 'Untitled Chart',
  });

  const selectedStitchId = ref<string | null>('k');
  const selectedCells = ref<Set<string>>(new Set());

  const initializeChart = (rows: number, cols: number) => {
    chart.value = {
      rows,
      cols,
      cells: initChartCells(rows, cols),
      name: chart.value.name,
      gauge: chart.value.gauge,
    };
    selectedCells.value.clear();
  };

  const getCell = (row: number, col: number): ChartCell | undefined => {
    return chart.value.cells.find(c => c.row === row && c.col === col);
  };

  const setCell = (row: number, col: number, stitchId: string | null) => {
    if (stitchId) {
      chart.value.cells = placeStitch(
        chart.value.cells, 
        row, 
        col, 
        stitchId, 
        chart.value.rows, 
        chart.value.cols
      );
    } else {
      chart.value.cells = removeStitch(chart.value.cells, row, col);
    }
  };

  const clearCell = (row: number, col: number) => {
    chart.value.cells = removeStitch(chart.value.cells, row, col);
  };

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const toggleCellSelection = (row: number, col: number) => {
    const key = getCellKey(row, col);
    if (selectedCells.value.has(key)) {
      selectedCells.value.delete(key);
    } else {
      selectedCells.value.add(key);
    }
  };

  const clearSelection = () => {
    selectedCells.value.clear();
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.value.has(getCellKey(row, col));
  };

  const serializeChart = (): string => {
    const data: SerializedChart = {
      version: '1.0',
      chart: chart.value,
    };
    return JSON.stringify(data);
  };

  const deserializeChart = (data: string): boolean => {
    try {
      const parsed: SerializedChart = JSON.parse(data);
      if (parsed.version && parsed.chart) {
        chart.value = parsed.chart;
        selectedCells.value.clear();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to deserialize chart:', e);
      return false;
    }
  };

  const exportChart = () => {
    const data = serializeChart();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chart.value.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChart = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = deserializeChart(content);
        resolve(success);
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  };

  return {
    chart,
    selectedStitchId,
    selectedCells,
    initializeChart,
    getCell,
    setCell,
    clearCell,
    toggleCellSelection,
    clearSelection,
    isCellSelected,
    serializeChart,
    deserializeChart,
    exportChart,
    importChart,
  };
}
