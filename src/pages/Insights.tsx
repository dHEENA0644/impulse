import React from 'react';
import { useSpendingData } from '@/hooks/useSpendingData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Wallet, Brain, Heart } from 'lucide-react';

const Insights = () => {
  const { entries, stats } = useSpendingData();

  const categoryData = entries.reduce((acc: any[], curr) => {
    const existing = acc.find(i => i.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  const moodData = entries.reduce((acc: any[], curr) => {
    const existing = acc.find(i => i.name === curr.mood);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: curr.mood, count: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <TrendingUp size={40} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">No Data Yet</h2>
        <p className="text-muted-foreground max-w-xs">Track some impulse thoughts to see your spending patterns here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <h1 className="text-2xl font-display font-bold">Spending Insights</h1>

      <div className="grid gap-4">
        <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-lg shadow-primary/20 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-primary-foreground/80 text-sm font-medium uppercase">Awareness Score</p>
            <p className="text-4xl font-bold">{Math.round((stats.savedCount / stats.count) * 100)}%</p>
          </div>
          <Brain size={48} className="opacity-20" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-2xl border shadow-sm flex flex-col justify-between">
            <p className="text-muted-foreground text-xs font-bold uppercase">Total Checked</p>
            <p className="text-2xl font-bold mt-2">${stats.totalPotential.toFixed(0)}</p>
          </div>
          <div className="bg-awareness/10 border-awareness/20 p-4 rounded-2xl border shadow-sm flex flex-col justify-between">
            <p className="text-awareness text-xs font-bold uppercase">Total Saved</p>
            <p className="text-2xl font-bold mt-2 text-awareness">${stats.totalSaved.toFixed(0)}</p>
          </div>
        </div>
      </div>

      <section className="bg-card p-6 rounded-3xl border shadow-sm space-y-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Wallet size={20} className="text-primary" />
          By Category
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 rounded-3xl border shadow-sm space-y-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Heart size={20} className="text-destructive" />
          Mood Triggers
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moodData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground text-center italic">
          You seem to have the most impulses when you feel <strong>{moodData.sort((a, b) => b.count - a.count)[0]?.name}</strong>.
        </p>
      </section>
    </div>
  );
};

export default Insights;
