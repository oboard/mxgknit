import type { ChartCell, Stitch } from '../types/stitch';
import { defaultStitches } from '../data/stitches';

/**
 * 在图表中放置一个针法，处理多格子占用
 */
export function placeStitch(
  cells: ChartCell[],
  row: number,
  col: number,
  stitchId: string,
  maxRows: number,
  maxCols: number
): ChartCell[] {
  const stitch = defaultStitches.find(s => s.id === stitchId);
  if (!stitch) return cells;

  const newCells = [...cells];
  
  // 检查是否有足够空间
  if (row + stitch.height > maxRows || col + stitch.width > maxCols) {
    return cells; // 空间不足，不放置
  }

  // 检查目标区域是否被占用
  for (let r = row; r < row + stitch.height; r++) {
    for (let c = col; c < col + stitch.width; c++) {
      const existingCell = newCells.find(cell => cell.row === r && cell.col === c);
      if (existingCell && existingCell.cellType !== 'empty') {
        return cells; // 区域被占用，不放置
      }
    }
  }

  // 清除目标区域的现有格子
  for (let r = row; r < row + stitch.height; r++) {
    for (let c = col; c < col + stitch.width; c++) {
      const index = newCells.findIndex(cell => cell.row === r && cell.col === c);
      if (index !== -1) {
        newCells.splice(index, 1);
      }
    }
  }

  // 放置新的针法
  for (let r = row; r < row + stitch.height; r++) {
    for (let c = col; c < col + stitch.width; c++) {
      const isPrimary = r === row && c === col;
      newCells.push({
        row: r,
        col: c,
        stitchId: isPrimary ? stitchId : null,
        cellType: isPrimary ? 'primary' : 'occupied',
        primaryCell: isPrimary ? undefined : { row, col }
      });
    }
  }

  return newCells;
}

/**
 * 移除指定位置的针法（包括其占用的所有格子）
 */
export function removeStitch(cells: ChartCell[], row: number, col: number): ChartCell[] {
  const targetCell = cells.find(cell => cell.row === row && cell.col === col);
  if (!targetCell) return cells;

  let primaryCell = targetCell;
  
  // 如果点击的是occupied格子，找到primary格子
  if (targetCell.cellType === 'occupied' && targetCell.primaryCell) {
    primaryCell = cells.find(cell => 
      cell.row === targetCell.primaryCell!.row && 
      cell.col === targetCell.primaryCell!.col
    ) || targetCell;
  }

  if (primaryCell.cellType !== 'primary') return cells;

  const stitch = defaultStitches.find(s => s.id === primaryCell.stitchId);
  if (!stitch) return cells;

  // 移除所有相关的格子
  const newCells = cells.filter(cell => {
    if (cell.cellType === 'primary' && 
        cell.row === primaryCell.row && 
        cell.col === primaryCell.col) {
      return false;
    }
    if (cell.cellType === 'occupied' && 
        cell.primaryCell?.row === primaryCell.row && 
        cell.primaryCell?.col === primaryCell.col) {
      return false;
    }
    return true;
  });

  // 添加空格子
  for (let r = primaryCell.row; r < primaryCell.row + stitch.height; r++) {
    for (let c = primaryCell.col; c < primaryCell.col + stitch.width; c++) {
      newCells.push({
        row: r,
        col: c,
        stitchId: null,
        cellType: 'empty'
      });
    }
  }

  return newCells;
}

/**
 * 获取指定位置的针法信息
 */
export function getStitchAt(cells: ChartCell[], row: number, col: number): Stitch | null {
  const cell = cells.find(c => c.row === row && c.col === col);
  if (!cell) return null;

  let stitchId: string | null = null;
  
  if (cell.cellType === 'primary') {
    stitchId = cell.stitchId;
  } else if (cell.cellType === 'occupied' && cell.primaryCell) {
    const primaryCell = cells.find(c => 
      c.row === cell.primaryCell!.row && 
      c.col === cell.primaryCell!.col
    );
    stitchId = primaryCell?.stitchId || null;
  }

  if (!stitchId) return null;
  return defaultStitches.find(s => s.id === stitchId) || null;
}

/**
 * 初始化图表格子
 */
export function initializeChart(rows: number, cols: number): ChartCell[] {
  const cells: ChartCell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        row: r,
        col: c,
        stitchId: null,
        cellType: 'empty'
      });
    }
  }
  return cells;
}