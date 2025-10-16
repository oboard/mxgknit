export interface Stitch {
  id: string;
  name: string;
  symbol: string;
  category: StitchCategory;
  abbreviation: string;
  description: string;
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
