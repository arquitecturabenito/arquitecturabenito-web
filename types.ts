import * as d3 from 'd3';

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