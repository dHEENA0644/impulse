import React from 'react';
import { useSpendingData } from '@/hooks/useSpendingData';
import SpendCard from '@/components/SpendCard';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const { entries, deleteEntry } = useSpendingData();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-display font-bold">Thought History</h1>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="relative group">
              <SpendCard entry={entry} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this entry?')) deleteEntry(entry.id);
                }}
                className="absolute -right-2 -top-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
          <p className="text-muted-foreground font-medium">History is empty.</p>
          <p className="text-sm text-muted-foreground/60">Start tracking your impulses to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default History;
