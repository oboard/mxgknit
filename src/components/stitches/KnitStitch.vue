<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 40 40" 
    class="stitch-svg"
  >
    <rect 
      x="2" 
      y="2" 
      width="36" 
      height="36" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2"
      rx="2"
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