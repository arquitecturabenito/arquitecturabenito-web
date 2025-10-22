
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface NodeData extends SimulationNodeDatum {
  id: string;
  group: number;
  size?: number;
  isCentral?: boolean;
  isNavLink?: boolean;
}

export interface LinkData extends SimulationLinkDatum<NodeData> {
  value: number;
}