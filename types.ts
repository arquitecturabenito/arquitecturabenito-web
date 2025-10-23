import * as d3 from 'd3';

// FIX: Explicitly add d3-force simulation properties to the NodeData interface.
// These properties are added by the d3 simulation, and explicitly defining them
// here resolves TypeScript errors.
export interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  isCentral?: boolean;
  isNavLink?: boolean;
  isProject?: boolean;
  projectId?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  value: number;
}
