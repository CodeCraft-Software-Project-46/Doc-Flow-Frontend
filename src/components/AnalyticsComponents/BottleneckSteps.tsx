// Shows steps with highest average processing time + breach rate

import { BOTTLENECK_DATA } from "../../pages/analytics/dummyData";

// Returns color based on breach percentage
function getBreachColor(breach: number): string {
  if (breach <= 5) return "#22c55e";   // green — low breach
  if (breach <= 15) return "#f59e0b";  // amber — medium
  return "#ef4444";                    // red — high breach
}

export default function BottleneckSteps() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-slate-900 text-base">📊 System Bottleneck Steps</div>
      <div className="text-xs text-slate-400 mt-1 mb-5">
        Steps with Highest Average Processing Time
      </div>

      <div className="flex flex-col gap-5">
        {BOTTLENECK_DATA.map((step) => (
          <div key={step.step}>
            {/* Step name */}
            <div className="text-sm font-semibold text-slate-800 mb-2">
              {step.step}
            </div>

            {/* Progress bar */}
            <div className="bg-slate-100 rounded-full h-3 overflow-hidden mb-1">
              {/* eslint-disable-next-line */}
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min((step.avg / 40) * 100, 100)}%`,
                  backgroundColor: getBreachColor(step.breach),
                }}
              />
            </div>

            {/* Stats row */}
            <div className="flex gap-3 text-xs text-slate-500">
              <span>{step.avg}h avg</span>
              {/* eslint-disable-next-line */}
              <span
                className="font-semibold"
                style={{ color: getBreachColor(step.breach) }}
              >
                · {step.breach}% breach
              </span>
              <span>· {step.tasks} tasks</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-5 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> 0–5% Excellent
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> 6–15% Good
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> +15% At Risk
        </span>
      </div>
    </div>
  );
}