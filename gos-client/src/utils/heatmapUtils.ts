export interface HeatPoint {
  x: number;
  y: number;
  value: number;
}

const MIN_GAME_COORD = 64;
const MAX_GAME_COORD = 192;
const GAME_SIZE = MAX_GAME_COORD - MIN_GAME_COORD;

export const parseWardData = (
  data: Record<string, Record<string, number>>,
  width: number,
  height: number
): HeatPoint[] => {
  const points: HeatPoint[] = [];
  let maxVal = 0;

  Object.entries(data).forEach(([xStr, yData]) => {
    const xGame = parseInt(xStr, 10);
    Object.entries(yData).forEach(([yStr, count]) => {
      const yGame = parseInt(yStr, 10);

      const xNorm = (xGame - MIN_GAME_COORD) / GAME_SIZE;
      const yNorm = (yGame - MIN_GAME_COORD) / GAME_SIZE;

      const x = xNorm * width;
      const y = height - (yNorm * height);

      points.push({ x, y, value: count });
      if (count > maxVal) maxVal = count;
    });
  });

  return points.map(p => ({ ...p, value: p.value / (maxVal || 1) }));
};
