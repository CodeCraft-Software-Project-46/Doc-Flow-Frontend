export default function SLATrend() {
  const TREND_DATA = [
    { day: "Mon", c: 74 }, { day: "Tue", c: 78 }, { day: "Wed", c: 80 },
    { day: "Thu", c: 82 }, { day: "Fri", c: 84 }, { day: "Sat", c: 83 }, { day: "Sun", c: 85 },
  ];
  
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 30;
  const minValue = 70;
  const maxValue = 90;
  const range = maxValue - minValue;
  
  // Calculate points for the line chart
  const points = TREND_DATA.map((point, index) => {
    const x = padding + (index * (chartWidth - 2 * padding)) / (TREND_DATA.length - 1);
    const y = chartHeight - padding - ((point.c - minValue) / range) * (chartHeight - 2 * padding);
    return { ...point, x, y };
  });
  
  // Generate SVG path for the line
  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-slate-900 text-base">SLA Compliance Trend</div>
      <div className="text-xs text-slate-400 mt-1 mb-5">Daily compliance % (last 7 days)</div>

      <div className="flex justify-center">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          {[70, 75, 80, 85, 90].map((value) => {
            const y = chartHeight - padding - ((value - minValue) / range) * (chartHeight - 2 * padding);
            return (
              <g key={`grid-${value}`}>
                <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                <text x={padding - 5} y={y + 4} fontSize="11" fill="#94a3b8" textAnchor="end">{value}%</text>
              </g>
            );
          })}
          
          {/* Line */}
          <path d={pathData} stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={pathData + ` L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`} fill="url(#lineGradient)" />
          
          {/* Data points and labels */}
          {points.map((point) => (
            <g key={point.day}>
              {/* Circle at data point */}
              <circle cx={point.x} cy={point.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
              
              {/* Value label above point */}
              <text x={point.x} y={point.y - 12} fontSize="12" fill="#1e293b" fontWeight="500" textAnchor="middle">
                {point.c}%
              </text>
              
              {/* Day label below chart */}
              <text x={point.x} y={chartHeight - padding + 18} fontSize="11" fill="#64748b" textAnchor="middle">
                {point.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}