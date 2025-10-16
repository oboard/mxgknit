export interface Stitch {
  id: string;
  name: string;
  symbol: string; // 保留用于向后兼容，将逐步废弃
  svgComponent?: string; // SVG组件名称
  category: StitchCategory;
  abbreviation: string;
  description: string;
  // 针法占用的格子尺寸 - 统一处理单格子和多格子
  width: number;  // 占用列数
  height: number; // 占用行数
}

export enum StitchCategory {
  Basic = 'basic',
  Increase = 'increase',
  Decrease = 'decrease',
  Cable = 'cable',
  Lace = 'lace',
  Texture = 'texture',
}

export interface ChartCell {
  row: number;
  col: number;
  stitchId: string | null;
  // 对于多格子针法，标记这个格子的角色
  cellType: 'primary' | 'occupied' | 'empty';
  // 如果是occupied格子，指向primary格子的坐标
  primaryCell?: { row: number; col: number };
}

export interface Chart {
  rows: number;
  cols: number;
  cells: ChartCell[];
  name: string;
  gauge?: {
    stitchesPerInch: number;
    rowsPerInch: number;
  };
}

export interface SerializedChart {
  version: string;
  chart: Chart;
}
