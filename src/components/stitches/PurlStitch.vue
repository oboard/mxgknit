<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 40 40" 
    class="stitch-svg"
  >
    <line 
      x1="5" 
      y1="20" 
      x2="35" 
      y2="20" 
      stroke="currentColor" 
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), {
  size: 40,
});
</script>

<style scoped>
.stitch-svg {
  color: #374151;
}
</style>