import { Card } from './ui/card';
import { Button } from './ui/button';
import type { Option } from '../types/toolkit';

interface CardSelectionProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  variant?: 'single' | 'grid';
}

export default function CardSelection({ options, value, onChange, variant = 'single' }: CardSelectionProps) {
  return (
    <div className={`mt-4 ${variant === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
      {options.map((option) => (
        <Card 
          key={option.id}
          className={`flex flex-col cursor-pointer transition-colors hover:bg-secondary/5 border-2 ${
            value === option.value ? 'border-primary' : 'border-secondary/20'
          }`}
          onClick={() => onChange(option.value)}
        >
          <div className="flex flex-col flex-1 p-6">
            <div className="flex-1 mb-4">
              <h3 className="font-semibold text-lg text-foreground mb-2">{option.label}</h3>
              {option.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">{option.description}</p>
              )}
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
              }}
            >
              {variant === 'grid' ? 'Review' : 'Explore'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
