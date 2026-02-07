import React from 'react';
import { SpendEntry } from '@/types/spending';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Smile, Frown, Meh, Zap, Ghost, User } from 'lucide-react';

interface SpendCardProps {
  entry: SpendEntry;
  onClick?: () => void;
}

const MoodIcon = ({ mood }: { mood: SpendEntry['mood'] }) => {
  switch (mood) {
    case 'happy': return <Smile className="text-mood-happy" />;
    case 'bored': return <Ghost className="text-mood-bored" />;
    case 'stressed': return <Zap className="text-mood-stressed" />;
    case 'excited': return <Sparkles className="text-mood-happy" />;
    case 'sad': return <Frown className="text-mood-neutral" />;
    default: return <Meh className="text-mood-neutral" />;
  }
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3 1.912 4.912L18.824 9.824 13.912 11.736 12 16.648l-1.912-4.912L5.176 9.824l4.912-1.912L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

const SpendCard: React.FC<SpendCardProps> = ({ entry, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card p-4 rounded-2xl border shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors cursor-pointer active:scale-[0.98]"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0",
        entry.wasPurchased ? "bg-muted text-muted-foreground" : "bg-awareness/10 text-awareness"
      )}>
        <MoodIcon mood={entry.mood} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold truncate">{entry.itemName}</h4>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(entry.timestamp, { addSuffix: true })} • {entry.category}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="font-bold">${entry.amount.toFixed(2)}</p>
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-wider",
          entry.wasPurchased ? "text-muted-foreground" : "text-awareness"
        )}>
          {entry.wasPurchased ? 'Purchased' : 'Saved'}
        </p>
      </div>
    </div>
  );
};

export default SpendCard;
