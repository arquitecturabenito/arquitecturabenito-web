import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Project } from '../data/projects';

interface OrbitalNode extends d3.SimulationNodeDatum {
  id: string;
  isCentral?: boolean;
  project?: Project;
  angle?: number;
  speed?: number;
  x?: number;
  y?: number;
}

interface OrbitalGalleryProps {
  projects: Project[];
}

const OrbitalGallery: React.FC<OrbitalGalleryProps> = ({ projects }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<d3.Timer | null>(null);

  useEffect(() => {
    if (!svgRef.current || projects.length === 0) return;

    if (timerRef.current) {
        timerRef.current.stop();
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    const orbitRadius = isMobile ? Math.min(width, height) / 3.5 : Math.min(width, height) / 3;
    const imageSize = isMobile ? 90 : 140;

    const nodes: OrbitalNode[] = projects.map((p, i) => {
        const angle = (i / projects.length) * 2 * Math.PI;
        return {
            id: p.id,
            project: p,
            angle: angle,
            speed: 0.005,
            x: orbitRadius * Math.cos(angle),
            y: orbitRadius * Math.sin(angle),
        };
    });

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    svg.selectAll('*').remove();
    
    const defs = svg.append('defs');
    const glowFilter = defs.append('filter')
      .attr('id', 'glow-filter-sharp')
      .attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');
      
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    projects.forEach(p => {
        defs.append('clipPath')
            .attr('id', `clip-${p.id}`)
            .append('circle')
            .attr('r', imageSize / 2);
    });

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .style('font-size', isMobile ? '3rem' : '5rem')
      .style('font-family', "'Cormorant Garamond', serif")
      .style('letter-spacing', '0.2em')
      .style('text-transform', 'uppercase')
      .style('filter', 'url(#glow-filter-sharp)')
      .text('Diseño');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`)
      .on('click', (event, d) => {
        if (d.project) {
          window.location.href = `/projects/${d.project.id}.html`;
        }
      });

    const projectGroup = node.append('g');

    projectGroup.append('circle')
      .attr('r', imageSize / 2 + 3)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke-width', 1)
      .style('transition', 'stroke 0.3s ease');
      
    projectGroup.append('image')
      .attr('class', 'normal-image')
      .attr('href', d => d.project?.normalImage || '')
      .attr('x', -imageSize / 2)
      .attr('y', -imageSize / 2)
      .attr('width', imageSize)
      .attr('height', imageSize)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .style('transition', 'opacity 0.5s ease');
      
    projectGroup.append('image')
      .attr('class', 'rollover-image')
      .attr('href', d => d.project?.rolloverImage || '')
      .attr('x', -imageSize / 2)
      .attr('y', -imageSize / 2)
      .attr('width', imageSize)
      .attr('height', imageSize)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .style('opacity', 0)
      .style('transition', 'opacity 0.5s ease');
      
    projectGroup.append('text')
        .text(d => d.project?.title || '')
        .attr('text-anchor', 'middle')
        .attr('y', imageSize / 2 + 20)
        .attr('fill', 'white')
        .style('font-size', '0.8rem')
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '0.1em')
        .style('opacity', 0)
        .style('transition', 'opacity 0.3s ease');

    node.on('mouseover', function(event, d) {
        const sel = d3.select(this);
        sel.select('g').transition().duration(300).attr('transform', 'scale(1.1)');
        sel.select('.normal-image').transition().duration(500).style('opacity', 0);
        sel.select('.rollover-image').transition().duration(500).style('opacity', 1);
        sel.select('circle').transition().duration(300).attr('stroke', 'rgba(0, 255, 255, 0.8)');
        sel.select('text').transition().duration(300).style('opacity', 1);
    });

    node.on('mouseout', function(event, d) {
        const sel = d3.select(this);
        sel.select('g').transition().duration(300).attr('transform', 'scale(1)');
        sel.select('.normal-image').transition().duration(500).style('opacity', 1);
        sel.select('.rollover-image').transition().duration(500).style('opacity', 0);
        sel.select('circle').transition().duration(300).attr('stroke', 'rgba(255, 255, 255, 0.3)');
        sel.select('text').transition().duration(300).style('opacity', 0);
    });

    const simulation = d3.forceSimulation<OrbitalNode>(nodes)
        .force('collide', d3.forceCollide(imageSize / 2 + 10).strength(0.5))
        .stop();

    timerRef.current = d3.timer(() => {
        nodes.forEach(d => {
            if (d.angle !== undefined && d.speed !== undefined) {
                d.angle += d.speed;
                d.x = orbitRadius * Math.cos(d.angle);
                d.y = orbitRadius * Math.sin(d.angle);
            }
        });

        for (let i = 0; i < 5; ++i) {
          simulation.tick();
        }

        node.attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);
    });

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
      }
    };
  }, [projects]);

  return <svg ref={svgRef} className="w-full h-full" />;
};

export default OrbitalGallery;