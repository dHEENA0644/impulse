import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpendingData } from '@/hooks/useSpendingData';
import { Mood, Category } from '@/types/spending';
import MoodSelector from '@/components/MoodSelector';
import ReflectionQuestions from '@/components/ReflectionQuestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronLeft, Check, X } from 'lucide-react';

const categories: Category[] = ['Electronics', 'Fashion', 'Food', 'Entertainment', 'Home', 'Other'];

const AddSpend = () => {
  const navigate = useNavigate();
  const { addEntry } = useSpendingData();
  const [step, setStep] = useState(1);

  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('Other');
  const [mood, setMood] = useState<Mood | null>(null);
  const [reflectionStep, setReflectionStep] = useState(0);

  const handleNext = () => {
    if (step === 1 && (!itemName || !amount)) {
      toast.error("Please fill in item details");
      return;
    }
    if (step === 2 && !mood) {
      toast.error("How are you feeling?");
      return;
    }
    setStep(step + 1);
  };

  const finishReflection = (wasPurchased: boolean) => {
    const amt = parseFloat(amount);
    addEntry({
      itemName,
      amount: amt,
      category,
      mood: mood!,
      wasPurchased,
      savedAmount: wasPurchased ? 0 : amt,
    });

    if (wasPurchased) {
      toast.info("Recorded. Awareness is the first step.");
    } else {
      toast.success("Great job! You saved $" + amt.toFixed(2));
    }
    navigate('/');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center gap-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 hover:bg-muted rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-display font-bold">Impulse Check</h1>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <Label htmlFor="itemName">What are you thinking of buying?</Label>
            <Input
              id="itemName"
              placeholder="e.g. New Headphones"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="text-lg py-6 rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg py-6 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-[52px] rounded-2xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleNext} className="w-full py-8 rounded-2xl text-lg font-bold">
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <h2 className="text-2xl font-display font-bold text-center">How are you feeling right now?</h2>
          <MoodSelector selectedMood={mood} onSelect={setMood} />
          <Button onClick={handleNext} className="w-full py-8 rounded-2xl text-lg font-bold">
            Continue to Reflection
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-10">
          {reflectionStep < 4 ? (
            <ReflectionQuestions
              currentStep={reflectionStep}
              onAnswer={() => setReflectionStep(reflectionStep + 1)}
            />
          ) : (
            <div className="space-y-8 text-center animate-in zoom-in duration-500">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Final Decision</h2>
                <p className="text-muted-foreground">You've paused and reflected. What's the plan?</p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => finishReflection(false)}
                  className="bg-awareness text-white p-6 rounded-3xl flex items-center justify-between font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-awareness/20"
                >
                  <span>I'll pass for now</span>
                  <Check size={28} />
                </button>

                <button
                  onClick={() => finishReflection(true)}
                  className="bg-muted text-foreground p-6 rounded-3xl flex items-center justify-between font-bold text-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <span>I still want to buy it</span>
                  <X size={28} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSpend;
