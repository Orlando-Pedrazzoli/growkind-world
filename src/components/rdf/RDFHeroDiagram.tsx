'use client';

import { useEffect, useRef, useCallback } from 'react';

type NodeId = 'crianca' | 'adulto' | 'ambiente';
type LineId = 'line1' | 'line2' | 'line3';

interface NodeConfig {
  id: NodeId;
  cx: number;
  cy: number;
  r: number;
  label: string;
  role: string;
  fillClass: string;
}

const NODES: NodeConfig[] = [
  {
    id: 'crianca',
    cx: 220,
    cy: 52,
    r: 58,
    label: 'Criança',
    role: 'ponto de partida',
    fillClass: 'rgba(74,124,111,0.45)',
  },
  {
    id: 'adulto',
    cx: 68,
    cy: 330,
    r: 58,
    label: 'Adulto',
    role: 'lê e ajusta',
    fillClass: 'rgba(196,164,74,0.25)',
  },
  {
    id: 'ambiente',
    cx: 372,
    cy: 330,
    r: 58,
    label: 'Ambiente',
    role: 'modula o campo',
    fillClass: 'rgba(120,88,48,0.45)',
  },
];

const LINES: { id: LineId; x1: number; y1: number; x2: number; y2: number }[] =
  [
    { id: 'line1', x1: 220, y1: 52, x2: 68, y2: 330 },
    { id: 'line2', x1: 68, y1: 330, x2: 372, y2: 330 },
    { id: 'line3', x1: 372, y1: 330, x2: 220, y2: 52 },
  ];

const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

export default function RDFHeroDiagram() {
  const nodeRefs = useRef<Record<NodeId, SVGGElement | null>>({
    crianca: null,
    adulto: null,
    ambiente: null,
  });
  const lineRefs = useRef<Record<LineId, SVGLineElement | null>>({
    line1: null,
    line2: null,
    line3: null,
  });
  const centerDotRef = useRef<SVGCircleElement | null>(null);
  const centerContentRef = useRef<SVGGElement | null>(null);
  const replayBtnRef = useRef<HTMLButtonElement | null>(null);

  const reset = useCallback(() => {
    Object.values(nodeRefs.current).forEach(el => {
      if (el) el.style.opacity = '0';
    });
    Object.values(lineRefs.current).forEach(el => {
      if (el) {
        el.style.strokeDashoffset = '1000';
        el.style.transition = 'none';
      }
    });
    if (centerDotRef.current) centerDotRef.current.style.opacity = '0';
    if (centerContentRef.current) centerContentRef.current.style.opacity = '0';
    if (replayBtnRef.current) replayBtnRef.current.style.opacity = '0';
  }, []);

  const showNode = useCallback((id: NodeId) => {
    const el = nodeRefs.current[id];
    if (el) el.style.opacity = '1';
  }, []);

  const drawLine = useCallback((id: LineId) => {
    const el = lineRefs.current[id];
    if (!el) return;
    el.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)';
    el.style.strokeDashoffset = '0';
  }, []);

  const startSequence = useCallback(async () => {
    reset();
    await wait(600);

    showNode('crianca');
    await wait(950);
    showNode('ambiente');
    await wait(950);
    showNode('adulto');
    await wait(750);

    drawLine('line1');
    await wait(650);
    drawLine('line2');
    await wait(650);
    drawLine('line3');
    await wait(850);

    if (centerDotRef.current) centerDotRef.current.style.opacity = '0.7';
    await wait(500);

    if (centerContentRef.current) centerContentRef.current.style.opacity = '1';
    await wait(700);

    if (replayBtnRef.current) replayBtnRef.current.style.opacity = '1';
  }, [reset, showNode, drawLine]);

  useEffect(() => {
    startSequence();
  }, [startSequence]);

  return (
    <div className='relative w-full'>
      <svg
        viewBox='0 0 440 420'
        xmlns='http://www.w3.org/2000/svg'
        className='h-auto w-full overflow-visible'
      >
        {/* Triangle lines */}
        {LINES.map(line => (
          <line
            key={line.id}
            ref={el => {
              lineRefs.current[line.id] = el;
            }}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke='rgba(196,164,74,0.35)'
            strokeWidth='1.2'
            fill='none'
            strokeDasharray='1000'
            strokeDashoffset='1000'
          />
        ))}

        {/* Nodes */}
        {NODES.map(node => (
          <g
            key={node.id}
            ref={el => {
              nodeRefs.current[node.id] = el;
            }}
            style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
          >
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fillClass}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r + 2}
              fill='none'
              stroke='rgba(196,164,74,0.4)'
              strokeWidth='1.5'
            />
            <text
              textAnchor='middle'
              x={node.cx}
              y={node.cy - 6}
              fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
              fontSize='22'
              fontWeight='400'
              fill='#faf8f4'
            >
              {node.label}
            </text>
            <text
              textAnchor='middle'
              x={node.cx}
              y={node.cy + 13}
              fontFamily="'DM Sans', sans-serif"
              fontSize='11'
              fontWeight='300'
              fill='#c4a44a'
              letterSpacing='0.1em'
            >
              {node.role}
            </text>
          </g>
        ))}

        {/* Center dot */}
        <circle
          ref={centerDotRef}
          cx='220'
          cy='228'
          r='4'
          fill='#c4a44a'
          style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
        />

        {/* Center content */}
        <g
          ref={centerContentRef}
          style={{ opacity: 0, transition: 'opacity 1s ease' }}
        >
          <circle
            cx='220'
            cy='222'
            r='72'
            fill='rgba(250,248,244,0.03)'
            stroke='rgba(196,164,74,0.14)'
            strokeWidth='1'
          />
          <text
            textAnchor='middle'
            x='220'
            y='210'
            fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
            fontSize='20'
            fontWeight='400'
            fill='#faf8f4'
          >
            Campo
          </text>
          <text
            textAnchor='middle'
            x='220'
            y='234'
            fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
            fontSize='20'
            fontWeight='400'
            fill='#faf8f4'
          >
            Relacional
          </text>
          <line
            x1='188'
            y1='243'
            x2='252'
            y2='243'
            stroke='rgba(196,164,74,0.25)'
            strokeWidth='0.8'
          />
          <text
            textAnchor='middle'
            x='220'
            y='259'
            fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
            fontStyle='italic'
            fontSize='13'
            fill='rgba(250,248,244,0.45)'
          >
            onde o desenvolvimento
          </text>
          <text
            textAnchor='middle'
            x='220'
            y='275'
            fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
            fontStyle='italic'
            fontSize='13'
            fill='rgba(250,248,244,0.45)'
          >
            acontece
          </text>
        </g>
      </svg>

      {/* Replay button */}
      <button
        ref={replayBtnRef}
        onClick={startSequence}
        className='absolute bottom-2 right-2 cursor-pointer'
        style={{
          background: 'none',
          border: '1px solid rgba(196,164,74,0.2)',
          color: 'rgba(196,164,74,0.4)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '6px 12px',
          borderRadius: 20,
          opacity: 0,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.borderColor =
            'rgba(196,164,74,0.5)';
          (e.target as HTMLButtonElement).style.color = 'rgba(196,164,74,0.8)';
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.borderColor =
            'rgba(196,164,74,0.2)';
          (e.target as HTMLButtonElement).style.color = 'rgba(196,164,74,0.4)';
        }}
      >
        ↺ &nbsp;repetir
      </button>
    </div>
  );
}
