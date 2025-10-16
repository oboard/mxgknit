<template>
  <svg 
    :width="size * 2" 
    :height="size" 
    viewBox="0 0 80 40" 
    class="stitch-svg"
  >
    <!-- 左侧线条 -->
    <path 
      d="M 10 10 Q 30 30 50 10" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3"
      stroke-linecap="round"
    />
    <!-- 右侧线条 -->
    <path 
      d="M 30 30 Q 50 10 70 30" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3"
      stroke-linecap="round"
    />
    <!-- 交叉点 -->
    <circle 
      cx="40" 
      cy="20" 
      r="3" 
      fill="currentColor"
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