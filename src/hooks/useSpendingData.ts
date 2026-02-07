import { useState, useEffect } from 'react';
import { SpendEntry } from '@/types/spending';

export const useSpendingData = () => {
  const [entries, setEntries] = useState<SpendEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('impulse_check_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse entries', e);
      }
    }
  }, []);

  const saveEntries = (newEntries: SpendEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('impulse_check_entries', JSON.stringify(newEntries));
  };

  const addEntry = (entry: Omit<SpendEntry, 'id' | 'timestamp'>) => {
    const fullEntry: SpendEntry = {
      ...entry,
      id: typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2) + Date.now().toString(36),
      timestamp: Date.now(),
    };
    saveEntries([fullEntry, ...entries]);
    return fullEntry;
  };

  const updateEntry = (id: string, updates: Partial<SpendEntry>) => {
    const newEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    saveEntries(newEntries);
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter((entry) => entry.id !== id));
  };

  const stats = {
    totalPotential: entries.reduce((acc, curr) => acc + curr.amount, 0),
    totalSaved: entries.reduce((acc, curr) => acc + curr.savedAmount, 0),
    totalSpent: entries.reduce((acc, curr) => acc + (curr.wasPurchased ? curr.amount : 0), 0),
    count: entries.length,
    savedCount: entries.filter(e => !e.wasPurchased).length,
  };

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    stats,
  };
};
