<template>
  <div class="bg-base-200 p-4 rounded-lg">
    <h3 class="text-lg font-bold mb-4">Chart Properties</h3>

    <div class="space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Chart Name</span>
        </label>
        <input
          type="text"
          :value="name"
          @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
          class="input input-bordered input-sm"
          placeholder="Untitled Chart"
        />
      </div>

      <div class="divider my-2"></div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Rows</span>
        </label>
        <input
          type="number"
          :value="rows"
          @input="$emit('update:rows', parseInt(($event.target as HTMLInputElement).value))"
          class="input input-bordered input-sm"
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
          :value="cols"
          @input="$emit('update:cols', parseInt(($event.target as HTMLInputElement).value))"
          class="input input-bordered input-sm"
          min="1"
          max="100"
        />
      </div>

      <button class="btn btn-sm btn-primary w-full" @click="$emit('resize-chart')">
        Apply Size
      </button>

      <div class="divider my-2"></div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Cell Size</span>
        </label>
        <input
          type="range"
          :value="cellSize"
          @input="$emit('update:cellSize', parseInt(($event.target as HTMLInputElement).value))"
          min="30"
          max="80"
          class="range range-sm"
        />
        <div class="text-xs text-center mt-1">{{ cellSize }}px</div>
      </div>

      <div class="divider my-2"></div>

      <div class="collapse collapse-arrow bg-base-300">
        <input type="checkbox" />
        <div class="collapse-title font-medium">Gauge (Optional)</div>
        <div class="collapse-content space-y-3">
          <div class="form-control">
            <label class="label">
              <span class="label-text-alt">Stitches per inch</span>
            </label>
            <input
              type="number"
              :value="gauge?.stitchesPerInch || ''"
              @input="updateGauge('stitchesPerInch', ($event.target as HTMLInputElement).value)"
              class="input input-bordered input-xs"
              placeholder="e.g., 5"
              step="0.5"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text-alt">Rows per inch</span>
            </label>
            <input
              type="number"
              :value="gauge?.rowsPerInch || ''"
              @input="updateGauge('rowsPerInch', ($event.target as HTMLInputElement).value)"
              class="input input-bordered input-xs"
              placeholder="e.g., 7"
              step="0.5"
            />
          </div>
        </div>
      </div>

      <div class="divider my-2"></div>

      <div class="stats stats-vertical shadow text-xs">
        <div class="stat py-2">
          <div class="stat-title text-xs">Total Cells</div>
          <div class="stat-value text-lg">{{ rows * cols }}</div>
        </div>

        <div class="stat py-2">
          <div class="stat-title text-xs">Filled Cells</div>
          <div class="stat-value text-lg">{{ filledCells }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  rows: number;
  cols: number;
  cellSize: number;
  filledCells: number;
  gauge?: {
    stitchesPerInch: number;
    rowsPerInch: number;
  };
}

defineProps<Props>();

const emit = defineEmits<{
  'update:name': [value: string];
  'update:rows': [value: number];
  'update:cols': [value: number];
  'update:cellSize': [value: number];
  'update:gauge': [gauge: { stitchesPerInch: number; rowsPerInch: number } | undefined];
  'resize-chart': [];
}>();

const updateGauge = (field: 'stitchesPerInch' | 'rowsPerInch', value: string) => {
  const numValue = parseFloat(value);
  if (value === '' || isNaN(numValue)) {
    emit('update:gauge', undefined);
  } else {
    const currentGauge = defineProps<Props>().gauge || { stitchesPerInch: 0, rowsPerInch: 0 };
    emit('update:gauge', {
      ...currentGauge,
      [field]: numValue,
    });
  }
};
</script>
