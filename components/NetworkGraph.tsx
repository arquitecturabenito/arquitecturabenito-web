import React, { useEffect, useRef } from 'react';
import { NodeData, LinkData } from '../types';
import EyeIcon from './EyeIcon';

declare const d3: any;

const nodesData: NodeData[] = [
  { id: 'ARQUITECTURA', group: 1, isCentral: true, isNavLink: true },
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

const linksData: LinkData[] = [
  { source: 'ARQUITECTURA', target: 'DISEÑO', value: 1 },
  { source: 'ARQUITECTURA', target: 'CONTACTO', value: 1 },
  { source: 'ARQUITECTURA', target: 'DOCENCIA', value: 1 },
  { source: 'ARQUITECTURA', target: 'TRABAJO', value: 1 },
  { source: 'ARQUITECTURA', target: 'INVESTIGACIÓN', value: 1 },
  { source: 'ARQUITECTURA', target: 'EXPRESION ARTISTICA', value: 1 },
  { source: 'INVESTIGACIÓN', target: 'I+D', value: 2 },
  { source: 'EXPRESION ARTISTICA', target: 'Fotografía de la luz', value: 2 },
  { source: 'EXPRESION ARTISTICA', target: 'Interiorismo', value: 2 },
];

const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    svg.selectAll("*").remove(); // Clear previous renders

    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData).id((d: NodeData) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0, 0));

    const outerCircle = svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', Math.min(width, height) / 2 - 50)
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    const link = svg.append('g')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linksData)
      .join('line')
      .attr('stroke-width', (d: LinkData) => Math.sqrt(d.value));

    const node = svg.append('g')
      .selectAll('g')
      .data(nodesData)
      .join('g')
      .style('cursor', (d: NodeData) => d.isNavLink ? 'pointer' : 'default')
      .on('click', (event: any, d: NodeData) => {
          if (!d.isNavLink) return;
          event.stopPropagation();
          switch (d.id) {
            case 'ARQUITECTURA':
              window.location.href = '/arquitectura.html';
              break;
            case 'DISEÑO':
              window.location.href = '/diseno.html';
              break;
            case 'CONTACTO':
              window.location.href = '/contacto.html';
              break;
          }
      })
      .call(d3.drag()
          .on('start', (event: any, d: NodeData) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
          })
          .on('drag', (event: any, d: NodeData) => {
              d.fx = event.x;
              d.fy = event.y;
          })
          .on('end', (event: any, d: NodeData) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
          }));

    node.on('mouseover', function(event: any, d: NodeData) {
      if (d.isNavLink) {
        d3.select(this).select('text').attr('fill', '#00ffff');
        d3.select(this).select('circle').attr('fill', '#00ffff').attr('r', 7);
      }
    }).on('mouseout', function(event: any, d: NodeData) {
      if (d.isNavLink) {
        d3.select(this).select('text').attr('fill', '#fff');
        d3.select(this).select('circle').attr('fill', '#999').attr('r', 5);
      }
    });
          
    node.append('circle')
        .attr('r', 5)
        .attr('fill', '#999')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    
    node.append('text')
        .text((d: NodeData) => d.id)
        .attr('x', 12)
        .attr('y', 4)
        .attr('fill', (d: NodeData) => d.isNavLink ? '#fff' : '#ccc')
        .style('font-size', (d: NodeData) => {
          if (d.isCentral) return '1.5rem';
          if (d.isNavLink) return '1.1rem';
          return '0.8rem';
        })
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '0.1em');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: NodeData) => `translate(${d.x}, ${d.y})`);
    });

    const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        svg.attr('width', newWidth).attr('height', newHeight).attr('viewBox', [-newWidth / 2, -newHeight / 2, newWidth, newHeight]);
        outerCircle.attr('r', Math.min(newWidth, newHeight) / 2 - 50);
        simulation.force('center', d3.forceCenter(0, 0)).alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        simulation.stop();
        window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <EyeIcon />
        </div>
        <svg ref={svgRef} className="z-10"></svg>
    </div>
  );
};

export default NetworkGraph;
