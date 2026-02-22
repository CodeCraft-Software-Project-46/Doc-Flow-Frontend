// Type definitions for analytics dashboard

export interface InstanceSummary {
  id: string;
  status: "On Track" | "At Risk" | "SLA Breach";
}

export interface WorkflowStep {
  name: string;
  assignee: string;
  timeTaken: number | null;
  slaTarget: number;
  status: "Met" | "Breached" | "At Risk" | "Pending";
  running: boolean;
  pending: boolean;
  pct?: number;
}

export interface RecoveryStep {
  step: string;
  originalSLA: number;
  mustComplete: number;
  save: number;
  avgTime: number;
  achievable: "yes" | "tight" | "not_possible";
}

export interface Recovery {
  deficit: number;
  overall: "on_track" | "possible" | "critical";
  remaining: RecoveryStep[];
}

export interface InstanceDetail {
  overallSLA: number;
  timeUsed: number;
  department: string;
  steps: WorkflowStep[];
  recovery: Recovery;
}

export interface BottleneckStep {
  step: string;
  frequency: number;
  avgDelay: number;
  impact: "High" | "Medium" | "Low";
}

export interface UserSLA {
  user: string;
  onTimePercentage: number;
  avgTimeToComplete: number;
  breachCount: number;
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface CustomChart {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
}
