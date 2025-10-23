import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeData, LinkData } from '../types';
import { allProjectsData } from '../data/projects';

interface NetworkGraphProps {
  onNodeClick: (node: NodeData) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const isMobile = window.innerWidth < 768;

    const baseNodes: NodeData[] = [
      { id: 'CENTRAL_HUB', group: 0, isCentral: true, fx: 0, fy: 0 },
      { id: 'ARQUITECTURA', group: 1, isNavLink: true },
      { id: 'DISEÑO', group: 2, isNavLink: true },
      { id: 'CONTACTO', group: 2, isNavLink: true },
      { id: 'DOCENCIA', group: 2 },
      { id: 'TRABAJO', group: 2 },
      { id: 'INVESTIGACIÓN', group: 2 },
      { id: 'EXPRESION ARTISTICA', group: 2 },
      { id: 'Fotografía de la luz', group: 3 },
      { id: 'I+D', group: 3 },
      { id: 'Interiorismo', group: 3 },
    ];

    const baseLinks: LinkData[] = [
      { source: 'CENTRAL_HUB', target: 'ARQUITECTURA', value: 1 },
      { source: 'CENTRAL_HUB', target: 'DISEÑO', value: 1 },
      { source: 'CENTRAL_HUB', target: 'CONTACTO', value: 1 },
      { source: 'ARQUITECTURA', target: 'DOCENCIA', value: 1 },
      { source: 'ARQUITECTURA', target: 'TRABAJO', value: 1 },
      { source: 'ARQUITECTURA', target: 'INVESTIGACIÓN', value: 1 },
      { source: 'ARQUITECTURA', target: 'EXPRESION ARTISTICA', value: 1 },
      { source: 'INVESTIGACIÓN', target: 'I+D', value: 2 },
      { source: 'EXPRESION ARTISTICA', target: 'Fotografía de la luz', value: 2 },
      { source: 'EXPRESION ARTISTICA', target: 'Interiorismo', value: 2 },
    ];

    const projectNodes: NodeData[] = allProjectsData.map(p => ({
      id: p.title,
      group: 4, 
      isNavLink: true,
      isProject: true,
      projectId: p.id,
    }));

    const projectLinks: LinkData[] = allProjectsData.map(p => ({
      source: p.category === 'architecture' ? 'ARQUITECTURA' : 'DISEÑO',
      target: p.title,
      value: 5,
    }));
    
    const nodesData: NodeData[] = [...baseNodes, ...projectNodes];
    const linksData: LinkData[] = [...baseLinks, ...projectLinks];

    const visibleNodes = nodesData.filter(n => n.id !== 'CENTRAL_HUB');

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    svg.selectAll("*").remove(); 

    const simulation = d3.forceSimulation<NodeData>(nodesData)
      .force('link', d3.forceLink<NodeData, LinkData>(linksData).id(d => d.id).distance(d => isMobile ? (d.value === 5 ? 60 : 100) : (d.value === 5 ? 100 : 180)))
      .force('charge', d3.forceManyBody().strength(isMobile ? -120 : -180))
      .force('center', d3.forceCenter(0, 0))
      .alphaDecay(0.01);

    const outerCircle = svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', Math.min(width, height) / 2 - 40)
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    const link = svg.append('g')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linksData)
      .join('line')
      .attr('class', 'animated-link')
      .attr('stroke-width', d => d.value === 5 ? 0.5 : Math.sqrt(d.value));

    const node = svg.append('g')
      .selectAll('g')
      .data(visibleNodes)
      .join('g')
      .style('cursor', d => d.isNavLink ? 'pointer' : 'default')
      .on('click', (event, d) => {
          if (!d.isNavLink) return;
          event.stopPropagation();
          onNodeClick(d);
      })
      .call(d3.drag<SVGGElement, NodeData>()
          .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
          })
          .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
          })
          .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
          }));

    const getNodeColor = (d: NodeData) => {
      if (d.isNavLink && !d.isProject) return '#fff';
      if (d.isProject) return '#aaa';
      return '#777';
    };

    node.on('mouseover', function(event, d) {
      if (d.isNavLink) {
        d3.select(this).select('text').attr('fill', '#00ffff');
        d3.select(this).select('circle').attr('fill', '#00ffff').attr('r', d.isNavLink && !d.isProject ? 10 : (d.isProject ? 5 : 6));
      }
    }).on('mouseout', function(event, d) {
      if (d.isNavLink) {
        d3.select(this).select('text').attr('fill', getNodeColor(d));
        d3.select(this).select('circle').attr('fill', '#999').attr('r', d.isNavLink && !d.isProject ? 8 : (d.isProject ? 3 : 5));
      }
    });
          
    node.append('circle')
        .attr('r', d => d.isNavLink && !d.isProject ? 8 : (d.isProject ? 3 : 5))
        .attr('fill', '#999')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    
    node.append('text')
        .text(d => d.id)
        .attr('x', 12)
        .attr('y', 4)
        .attr('fill', getNodeColor)
        .style('font-size', d => {
          if (d.isNavLink && !d.isProject) return isMobile ? '1.1rem' : '1.4rem';
          if (d.isProject) return isMobile ? '0.75rem' : '0.8rem';
          return '0.8rem';
        })
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '0.1em');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NodeData).x || 0)
        .attr('y1', d => (d.source as NodeData).y || 0)
        .attr('x2', d => (d.target as NodeData).x || 0)
        .attr('y2', d => (d.target as NodeData).y || 0);

      node
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);
    });
    
    const interval = d3.interval(() => {
        simulation.alpha(0.05).restart();
    }, 5000);

    return () => {
        simulation.stop();
        interval.stop();
    };
  }, [onNodeClick]);

  return <svg ref={svgRef} className="w-full h-full" />;
};

export default NetworkGraph;