import React from 'react';
import { cn } from '@/lib/utils';

interface ReflectionQuestionsProps {
  currentStep: number;
  onAnswer: (answer: string) => void;
}

const questions = [
  {
    question: "Do I already own something similar?",
    options: ["Yes, I do", "No, this is unique", "I'm not sure"]
  },
  {
    question: "How will I feel about this in 30 days?",
    options: ["Still using it", "Might forget it", "Regretful"]
  },
  {
    question: "Does this purchase align with my values?",
    options: ["Perfectly", "Somewhat", "Not really"]
  },
  {
    question: "Can I afford to wait 24 hours?",
    options: ["Yes, I can wait", "No, it's a limited deal", "I'll try"]
  }
];

const ReflectionQuestions: React.FC<ReflectionQuestionsProps> = ({ currentStep, onAnswer }) => {
  if (currentStep >= questions.length) return null;

  const current = questions[currentStep];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="space-y-2">
        <p className="text-primary text-sm font-bold uppercase tracking-wider">Reflection {currentStep + 1}/{questions.length}</p>
        <h3 className="text-2xl font-display font-bold">{current.question}</h3>
      </div>

      <div className="flex flex-col gap-3">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="w-full p-4 rounded-2xl border-2 border-muted bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left font-medium active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReflectionQuestions;
