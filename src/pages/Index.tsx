import React from 'react';
import { Link } from 'react-router-dom';
import { useSpendingData } from '@/hooks/useSpendingData';
import { ArrowRight, Wallet, ShieldCheck, Sparkles } from 'lucide-react';
import SpendCard from '@/components/SpendCard';

const Index = () => {
  const { entries, stats } = useSpendingData();
  const recentEntries = entries.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="text-center space-y-4 py-4">
        <h1 className="text-4xl font-display font-bold leading-tight">
          Master Your <span className="text-primary">Impulses</span>
        </h1>
        <p className="text-[10px] text-muted-foreground/10">v1.0.1-fixed</p>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Pause, reflect, and track your spending thoughts. Build better habits, one choice at a time.
        </p>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          Check an Impulse <ArrowRight size={20} />
        </Link>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Total Saved</p>
          <p className="text-2xl font-bold text-awareness">${stats.totalSaved.toFixed(2)}</p>
        </div>
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Impulses Halted</p>
          <p className="text-2xl font-bold text-primary">{stats.savedCount}</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Recent Thoughts</h2>
          <Link to="/history" className="text-primary text-sm font-medium">View All</Link>
        </div>

        {recentEntries.length > 0 ? (
          <div className="space-y-4">
            {recentEntries.map(entry => (
              <SpendCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="text-muted-foreground" size={24} />
            </div>
            <p className="text-muted-foreground">No impulse checks yet.</p>
            <p className="text-sm text-muted-foreground/60">Your journey to awareness starts here.</p>
          </div>
        )}
      </section>

      <section className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary" size={20} />
          Private & Secure
        </h3>
        <p className="text-sm text-muted-foreground">
          All your data stays on your device. We don't track you or sell your data. Your financial reflections are for your eyes only.
        </p>
      </section>
    </div>
  );
};

export default Index;
