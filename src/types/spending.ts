export type Mood = 'happy' | 'bored' | 'stressed' | 'neutral' | 'excited' | 'sad';

export interface SpendEntry {
  id: string;
  itemName: string;
  amount: number;
  category: string;
  mood: Mood;
  timestamp: number;
  reflection?: string;
  wasPurchased: boolean;
  savedAmount: number;
}

export type Category = 'Electronics' | 'Fashion' | 'Food' | 'Entertainment' | 'Home' | 'Other';
