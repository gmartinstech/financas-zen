'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

type OverviewChartProps = {
  income: number;
  expenses: number;
};

const chartConfig = {
  Receitas: {
    label: 'Receitas',
    color: 'hsl(var(--chart-1))',
  },
  Despesas: {
    label: 'Despesas',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function OverviewChart({ income, expenses }: OverviewChartProps) {
  const month = new Date().toLocaleString('pt-BR', { month: 'long' });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const chartData = [
    { name: 'Receitas', value: income, fill: 'var(--color-Receitas)' },
    { name: 'Despesas', value: expenses, fill: 'var(--color-Despesas)' },
  ];

  return (
    <Card className="col-span-1 flex flex-col lg:col-span-3">
      <CardHeader>
        <CardTitle>Resumo de {capitalizedMonth}</CardTitle>
        <CardDescription>
          Uma visão geral de suas receitas e despesas no mês atual.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                strokeWidth={5}
                cy="50%"
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                content={({ payload }) => {
                  return (
                    <ul className="flex flex-col items-center justify-center gap-2">
                      {payload?.map((entry) => (
                         <li key={`item-${entry.value}`} className="flex items-center gap-2 text-sm">
                           <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                           <span>{entry.value}</span>
                         </li>
                      ))}
                    </ul>
                  )
                }}
                verticalAlign="middle"
                layout="vertical"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
