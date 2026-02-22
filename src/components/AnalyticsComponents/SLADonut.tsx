export default function SLADonut() {
  const data = [
    { name: "On Time", value: 77, color: "#22c55e" },
    { name: "At Risk", value: 13, color: "#f59e0b" },
    { name: "Breached", value: 10, color: "#ef4444" },
  ];
  
  // Calculate angles for SVG donut chart
  let currentAngle = -90; // Start at top
  const segments = data.map((item) => {
    const sliceAngle = (item.value / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return { ...item, startAngle, endAngle };
  });

  // Helper function to convert angle to SVG path coordinates for donut
  const getPathData = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = outerRadius * Math.cos(startRad);
    const y1 = outerRadius * Math.sin(startRad);
    const x2 = outerRadius * Math.cos(endRad);
    const y2 = outerRadius * Math.sin(endRad);
    
    const ix1 = innerRadius * Math.cos(startRad);
    const iy1 = innerRadius * Math.sin(startRad);
    const ix2 = innerRadius * Math.cos(endRad);
    const iy2 = innerRadius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-slate-900 text-base">SLA Compliance Distribution</div>
      <div className="text-xs text-slate-400 mt-1 mb-5">Current status across all workflows</div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Donut Chart */}
        <div className="w-56 h-56">
          <svg viewBox="-120 -120 240 240" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={getPathData(segment.startAngle, segment.endAngle, 50, 80)}
                fill={segment.color}
                opacity="0.9"
              />
            ))}
          </svg>
        </div>

        {/* Legend and Stats */}
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color } as React.CSSProperties}
              ></div>
              <div className="text-sm">
                <span className="text-slate-700 font-medium">{item.name}:</span>
                <span className="text-slate-900 font-semibold ml-2">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
