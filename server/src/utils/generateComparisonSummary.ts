interface Player {
  name: string;
  position: string;
  home_runs: number;
  batting_avg: number;
  obp: number;
  rbis: number;
  stolen_bases: number;
}

export const generateComparisonSummary = (p1: Player, p2: Player): string => {
  const hrKing = p1.home_runs > p2.home_runs ? p1.name : p2.name;
  const avgLeader = p1.batting_avg > p2.batting_avg ? p1.name : p2.name;
  const obpLeader = p1.obp > p2.obp ? p1.name : p2.name;
  const speedDemon = p1.stolen_bases > p2.stolen_bases ? p1.name : p2.name;

  return `${p1.name} plays ${p1.position}, and ${p2.name} plays ${p2.position}. 
${hrKing} leads in home runs, ${avgLeader} has a better batting average, and ${obpLeader} gets on base more often. 
When it comes to speed, ${speedDemon} has the edge in stolen bases. Both players bring valuable strengths to the Yankees lineup.`;
};
