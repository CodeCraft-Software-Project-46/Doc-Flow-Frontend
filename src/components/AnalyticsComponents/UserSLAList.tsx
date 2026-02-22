// Shows SLA compliance per user sorted by compliance rate

import { USER_SLA } from "../../pages/analytics/dummyData";

// Returns color based on compliance percentage
function getComplianceColor(compliance: number): string {
  if (compliance >= 90) return "#22c55e";  // green — great
  if (compliance >= 75) return "#f59e0b";  // amber — ok
  return "#ef4444";                        // red — poor
}

export default function UserSLAList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-slate-900 text-base">👤 SLA Compliance by User</div>
      <div className="text-xs text-slate-400 mt-1 mb-5">Sorted by Compliance Rate</div>

      <div className="flex flex-col gap-5">
        {USER_SLA.map((user) => (
          <div key={user.name}>

            {/* Name row + compliance % */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* Avatar circle */}
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                  {user.name[0]}
                </div>
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
              </div>
              {/* eslint-disable-next-line */}
              <span
                className="text-sm font-bold"
                style={{ color: getComplianceColor(user.compliance) }}
              >
                {user.compliance}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1">
              {/* eslint-disable-next-line */}
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${user.compliance}%`,
                  backgroundColor: getComplianceColor(user.compliance),
                }}
              />
            </div>

            {/* Stats row */}
            <div className="text-xs text-slate-400">
              {user.avg}h avg · {user.breaches} breaches · {user.tasks} tasks
            </div>

          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-5 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> ≥90% Excellent
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> 75–89% Good
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> &lt;75% At Risk
        </span>
      </div>
    </div>
  );
}