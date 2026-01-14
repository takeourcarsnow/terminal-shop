// ═══════════════════════════════════════════════════════════════════════════════
// REVENUE CHART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { TerminalWindow } from '@/components/ui';

interface RevenueChartProps {
  data?: { month: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Demo data
  const chartData = data || [
    { month: 'Aug', revenue: 12500 },
    { month: 'Sep', revenue: 18200 },
    { month: 'Oct', revenue: 15800 },
    { month: 'Nov', revenue: 22400 },
    { month: 'Dec', revenue: 31200 },
    { month: 'Jan', revenue: 28900 },
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const barHeight = 8;

  return (
    <TerminalWindow title="~/analytics/revenue.chart">
      <div className="font-mono text-sm text-terminal-muted mb-4">
        <span className="text-terminal-green">$</span> ./generate-chart.sh --type=bar --data=revenue
      </div>

      <div className="space-y-3">
        {chartData.map((item) => {
          const width = (item.revenue / maxRevenue) * 100;
          return (
            <div key={item.month} className="flex items-center gap-3">
              <span className="w-8 text-terminal-muted text-xs">{item.month}</span>
              <div className="flex-1 h-6 bg-terminal-header rounded overflow-hidden">
                <div
                  className="h-full bg-terminal-green transition-all duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="w-20 text-right text-terminal-green text-xs">
                ${(item.revenue / 100).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* ASCII Legend */}
      <div className="mt-6 pt-4 border-t border-terminal-border font-mono text-xs text-terminal-muted">
        <div className="flex justify-between">
          <span>Min: ${(Math.min(...chartData.map(d => d.revenue)) / 100).toLocaleString()}</span>
          <span>Max: ${(maxRevenue / 100).toLocaleString()}</span>
        </div>
        <div className="mt-2">
          ▓▓▓ = Revenue in USD
        </div>
      </div>
    </TerminalWindow>
  );
}

// ASCII Bar Chart Alternative
export function AsciiRevenueChart() {
  const data = [
    { month: 'Aug', value: 25 },
    { month: 'Sep', value: 36 },
    { month: 'Oct', value: 32 },
    { month: 'Nov', value: 45 },
    { month: 'Dec', value: 62 },
    { month: 'Jan', value: 58 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 10;

  return (
    <TerminalWindow title="~/analytics/ascii_chart.txt">
      <div className="font-mono text-xs">
        <div className="text-terminal-muted mb-2">Revenue (Last 6 Months)</div>
        <pre className="text-terminal-green">
          {Array.from({ length: chartHeight }, (_, rowIndex) => {
            const threshold = ((chartHeight - rowIndex) / chartHeight) * maxValue;
            return (
              <div key={rowIndex} className="flex">
                <span className="w-4 text-terminal-muted text-right mr-2">
                  {rowIndex === 0 ? maxValue : rowIndex === chartHeight - 1 ? '0' : ''}
                </span>
                <span className="text-terminal-border">│</span>
                {data.map((item, colIndex) => (
                  <span key={colIndex} className="w-6 text-center">
                    {item.value >= threshold ? '█' : ' '}
                  </span>
                ))}
              </div>
            );
          })}
          <div className="flex">
            <span className="w-4 mr-2"></span>
            <span className="text-terminal-border">└</span>
            {data.map((_, i) => (
              <span key={i} className="w-6 text-center text-terminal-border">──</span>
            ))}
          </div>
          <div className="flex">
            <span className="w-6"></span>
            {data.map((item, i) => (
              <span key={i} className="w-6 text-center text-terminal-muted">{item.month.slice(0, 1)}</span>
            ))}
          </div>
        </pre>
      </div>
    </TerminalWindow>
  );
}
