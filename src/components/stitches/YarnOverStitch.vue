<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 40 40" 
    class="stitch-svg"
  >
    <circle 
      cx="20" 
      cy="20" 
      r="12" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2"
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