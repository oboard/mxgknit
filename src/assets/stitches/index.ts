// 静态导入所有SVG文件内容
import knitSvg from './knit.svg?raw';
import purlSvg from './purl.svg?raw';
import yarnOverSvg from './yarn-over.svg?raw';
import k2togSvg from './k2tog.svg?raw';
import sskSvg from './ssk.svg?raw';
import slipSvg from './slip.svg?raw';
import cable4FrontSvg from './cable-4-front.svg?raw';
import cable4BackSvg from './cable-4-back.svg?raw';
import k3togSvg from './k3tog.svg?raw';
import makeBobbleSvg from './make-bobble.svg?raw';
import noStitchSvg from './no-stitch.svg?raw';

// SVG内容映射表 - 使用文件名作为key
export const svgContentMap: Record<string, string> = {
  'knit.svg': knitSvg,
  'purl.svg': purlSvg,
  'yarn-over.svg': yarnOverSvg,
  'k2tog.svg': k2togSvg,
  'ssk.svg': sskSvg,
  'slip.svg': slipSvg,
  'cable-4-front.svg': cable4FrontSvg,
  'cable-4-back.svg': cable4BackSvg,
  'k3tog.svg': k3togSvg,
  'make-bobble.svg': makeBobbleSvg,
  'no-stitch.svg': noStitchSvg,
};

// 获取SVG内容的函数 - 支持完整路径和文件名
export function getSvgContent(svgPath: string): string {
  // 如果是完整路径，提取文件名
  const fileName = svgPath.includes('/') ? svgPath.split('/').pop() || '' : svgPath;
  return svgContentMap[fileName] || '';
}

// 预加载所有SVG（实际上在构建时已经包含在bundle中）
export function preloadStitchSvgs(): Promise<void> {
  // 静态导入时不需要异步加载，直接返回resolved promise
  return Promise.resolve();
}