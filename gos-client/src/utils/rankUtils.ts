export const getRankColor = (rankValue: number): string => {
  const tier = Math.floor(rankValue / 10);
  switch (tier) {
    case 1: return 'rgb(98, 162, 52)';   // Herald (Green)
    case 2: return 'rgb(139, 94, 39)';   // Guardian (Bronze)
    case 3: return 'rgb(19, 115, 134)';  // Crusader (Blue-Green)
    case 4: return 'rgb(32, 177, 155)';  // Archon (Aqua)
    case 5: return 'rgb(179, 30, 70)';   // Legend (Red)
    case 6: return 'rgb(150, 77, 179)';  // Ancient (Purple)
    case 7: return 'rgb(104, 122, 202)'; // Divine (Blue)
    case 8: return 'rgb(230, 77, 26)';   // Immortal (Orange)
    default: return '#cbd5e1';
  }
};

export const getRankIconUrl = (rankValue: number): string => {
  const iconId = Math.floor(rankValue / 10);
  // Для Immortal (80+) иконка одна
  return `/assets/images/rank_icon_${iconId}.png`;
};

export const getRankStarUrl = (rankValue: number): string | null => {
  // Для Immortal звезд нет
  if (rankValue >= 80) return null;
  const stars = rankValue % 10;
  return stars > 0 ? `/assets/images/rank_star_${stars}.png` : null;
};

export const getRankNameBase = (name: string): string => {
  return name.replace(/\d+/g, '').trim();
};

export const getRankNameFull = (rankValue: number, name: string): string => {
  if (rankValue >= 80) return getRankNameBase(name);
  const stars = rankValue % 10;
  return `${getRankNameBase(name)} ${stars}`;
};
