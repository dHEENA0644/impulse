import React from 'react';
import { Mood } from '@/types/spending';
import { cn } from '@/lib/utils';
import { Smile, Frown, Meh, Zap, Ghost, Sparkles } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const moods: { type: Mood; label: string; icon: any; color: string }[] = [
  { type: 'happy', label: 'Happy', icon: Smile, color: 'text-mood-happy' },
  { type: 'excited', label: 'Excited', icon: Sparkles, color: 'text-mood-happy' },
  { type: 'bored', label: 'Bored', icon: Ghost, color: 'text-mood-bored' },
  { type: 'stressed', label: 'Stressed', icon: Zap, color: 'text-mood-stressed' },
  { type: 'neutral', label: 'Neutral', icon: Meh, color: 'text-mood-neutral' },
  { type: 'sad', label: 'Sad', icon: Frown, color: 'text-mood-neutral' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.type;

        return (
          <button
            key={mood.type}
            type="button"
            onClick={() => onSelect(mood.type)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95",
              isSelected
                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                : "border-transparent bg-muted/50 hover:bg-muted"
            )}
          >
            <Icon size={28} className={cn(mood.color, isSelected && "animate-bounce")} />
            <span className="text-xs font-bold mt-2">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
