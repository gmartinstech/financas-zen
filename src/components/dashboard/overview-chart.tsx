'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const data = [
  { name: 'Jan', Despesas: 4000, Receitas: 2400 },
  { name: 'Fev', Despesas: 3000, Receitas: 1398 },
  { name: 'Mar', Despesas: 2000, Receitas: 9800 },
  { name: 'Abr', Despesas: 2780, Receitas: 3908 },
  { name: 'Mai', Despesas: 1890, Receitas: 4800 },
  { name: 'Jun', Despesas: 2390, Receitas: 3800 },
  { name: 'Jul', Despesas: 3490, Receitas: 4300 },
];

const chartConfig = {
  Despesas: {
    label: 'Despesas',
    color: 'hsl(var(--primary))',
  },
  Receitas: {
    label: 'Receitas',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="Despesas" fill="var(--color-Despesas)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Receitas" fill="var(--color-Receitas)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
