<template>
  <div 
    class="stitch-symbol flex items-center justify-center"
    :style="{ 
      width: `${size}px`, 
      height: `${size}px`,
      gridColumn: `span ${stitch?.width || 1}`,
      gridRow: `span ${stitch?.height || 1}`
    }"
  >
    <component 
      v-if="stitchComponent" 
      :is="stitchComponent"
      :size="size"
      class="w-full h-full"
    />
    <span 
      v-else-if="stitch?.symbol" 
      class="text-center leading-none"
      :style="{ fontSize: `${size * 0.6}px` }"
    >
      {{ stitch.symbol }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultStitches } from '../../data/stitches';
import { stitchComponents } from './index';
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

const stitchComponent = computed(() => {
  if (!stitch.value?.svgComponent) return null;
  return stitchComponents[stitch.value.svgComponent as keyof typeof stitchComponents];
});
</script>

<style scoped>
.stitch-symbol {
  position: relative;
}
</style>