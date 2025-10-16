<template>
  <div class="stitch-symbol" :style="{
    width: `${size * (stitch?.width || 1)}px`,
    height: `${size}px`,
    gridColumn: `span ${stitch?.width || 1}`
  }">
    <div v-if="stitch?.symbol" v-html="stitch.symbol" class="stitch-svg" :style="{
      width: `${size * (stitch?.width || 1)}px`,
      height: `${size}px`
    }" />
    <span v-else class="symbol-fallback">
      {{ stitch?.symbol || '?' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultStitches } from '../../data/stitches';
import type { Stitch } from '../../types/stitch';

interface Props {
  stitchId: string | null;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
});

const stitch = computed((): Stitch | null => {
  if (!props.stitchId) return null;
  return defaultStitches.find(s => s.id === props.stitchId) || null;
});
</script>

<style scoped>
.stitch-symbol {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stitch-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.stitch-svg :deep(svg) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.symbol-fallback {
  font-size: 0.8em;
  text-align: center;
  color: currentColor;
}
</style>