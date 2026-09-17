type MapNode = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
};

// Diagrama esquemático de cobertura, no un mapa geográfico real: 4 nodos que
// representan la posición relativa aproximada de cada país en el Cono Sur,
// conectados a Argentina (sede de referencia) como una red de atención.
const nodes: MapNode[] = [
  { id: "argentina", label: "Argentina", cx: 190, cy: 195, r: 10 },
  { id: "chile", label: "Chile", cx: 100, cy: 145, r: 7 },
  { id: "paraguay", label: "Paraguay", cx: 225, cy: 80, r: 7 },
  { id: "uruguay", label: "Uruguay", cx: 255, cy: 195, r: 7 },
];

const [hub, ...spokes] = nodes;

export function CoverageMap() {
  return (
    <svg
      viewBox="0 0 330 250"
      role="img"
      aria-labelledby="coverage-map-title"
      className="h-auto w-full"
    >
      <title id="coverage-map-title">
        Diagrama esquemático de cobertura en el Cono Sur: Argentina, Chile,
        Paraguay y Uruguay
      </title>

      {spokes.map((node) => (
        <line
          key={node.id}
          x1={hub.cx}
          y1={hub.cy}
          x2={node.cx}
          y2={node.cy}
          stroke="#00C7E6"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.6}
        />
      ))}

      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r + 7}
            fill="#00C7E6"
            opacity={0.15}
          />
          <circle cx={node.cx} cy={node.cy} r={node.r} fill="#00C7E6" />
          <text
            x={node.cx}
            y={node.cy - node.r - 10}
            textAnchor="middle"
            className="fill-white text-[11px] font-semibold"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
