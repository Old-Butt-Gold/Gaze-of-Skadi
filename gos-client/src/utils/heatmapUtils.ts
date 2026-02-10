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

export const renderHeatmap = (
  canvas: HTMLCanvasElement,
  points: HeatPoint[],
  radius: number = 20,
  blur: number = 15
) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // 1. Shadow Canvas (Alpha channel)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = width;
  shadowCanvas.height = height;
  const shadowCtx = shadowCanvas.getContext('2d')!;

  shadowCtx.shadowBlur = blur;
  shadowCtx.shadowColor = 'black';

  points.forEach(p => {
    shadowCtx.beginPath();
    shadowCtx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    shadowCtx.fillStyle = `rgba(0,0,0,${p.value})`;
    shadowCtx.fill();
  });

  // 2. Gradient Palette (OpenDota Style: Blue -> Cyan -> Green -> Yellow -> Red)
  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width = 1;
  gradientCanvas.height = 256;
  const gradCtx = gradientCanvas.getContext('2d')!;

  const linearGrad = gradCtx.createLinearGradient(0, 0, 0, 256);
  linearGrad.addColorStop(0.0, 'transparent');
  linearGrad.addColorStop(0.2, '#0000ff'); // Deep Blue
  linearGrad.addColorStop(0.4, '#00ffff'); // Cyan
  linearGrad.addColorStop(0.6, '#00ff00'); // Green
  linearGrad.addColorStop(0.8, '#ffff00'); // Yellow
  linearGrad.addColorStop(1.0, '#ff0000'); // Red

  gradCtx.fillStyle = linearGrad;
  gradCtx.fillRect(0, 0, 1, 256);
  const palette = gradCtx.getImageData(0, 0, 1, 256).data;

  // 3. Colorize
  const shadowImage = shadowCtx.getImageData(0, 0, width, height);
  const shadowData = shadowImage.data;
  const finalImage = ctx.createImageData(width, height);
  const finalData = finalImage.data;

  for (let i = 0; i < shadowData.length; i += 4) {
    const alpha = shadowData[i + 3];
    if (alpha > 0) {
      const offset = alpha * 4;
      finalData[i] = palette[offset];     // R
      finalData[i + 1] = palette[offset + 1]; // G
      finalData[i + 2] = palette[offset + 2]; // B
      finalData[i + 3] = Math.min(255, alpha + 20);
    }
  }

  ctx.putImageData(finalImage, 0, 0);
};
