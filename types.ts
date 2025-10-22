export interface Project {
  id: string;
  category: 'architecture' | 'design';
  title: string;
  normalImage: string;
  rolloverImage: string;
  description: string;
  images: string[];
}

export interface D3Node {
    id: string;
    group: number;
    isCentral?: boolean;
    isNavLink?: boolean;
    isProject?: boolean;
    projectId?: string;
    fx?: number | null;
    fy?: number | null;
    x?: number;
    y?: number;
}

export interface D3Link {
    source: string | D3Node;
    target: string | D3Node;
    value: number;
}
