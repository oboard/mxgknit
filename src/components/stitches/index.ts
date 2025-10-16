// SVG针法组件注册表
import KnitStitch from './KnitStitch.vue';
import PurlStitch from './PurlStitch.vue';
import YarnOverStitch from './YarnOverStitch.vue';
import Cable4FrontStitch from './Cable4FrontStitch.vue';

export const stitchComponents = {
  KnitStitch,
  PurlStitch,
  YarnOverStitch,
  Cable4FrontStitch,
};

export type StitchComponentName = keyof typeof stitchComponents;