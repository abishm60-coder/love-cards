import React, { useEffect, useState } from 'react';
import { ThemeType } from '../types';

interface CountdownTimerProps {
  targetDateStr: string; // YYYY-MM-DD
  targetTimeStr: string; // HH:MM
  selectedTheme: ThemeType;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateStr,
  targetTimeStr,
  selectedTheme,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetStr = `${targetDateStr}T${targetTimeStr || '00:00'}:00`;
      const difference = +new Date(targetStr) - +new Date();
      
      if (difference <= 0) {
        setIsOver(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsOver(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr, targetTimeStr]);

  const padZero = (num: number) => String(num).padStart(2, '0');

  const renderTimerBlock = (value: number, label: string) => {
    return (
      <div className="flex flex-col items-center justify-center border border-stone-200/60 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.01)] py-4 px-3 min-w-[75px] md:min-w-[90px] aspect-square">
        <span className="font-serif text-3xl md:text-4xl text-stone-850 font-light leading-none">
          {padZero(value)}
        </span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-wider uppercase text-stone-400 font-semibold mt-2">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-6">
      <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans font-semibold">
        {isOver ? 'EVENT LIVE IN PROGRESS' : 'COUNTING DOWN THE MOMENTS'}
      </h3>
      <div className="flex items-center justify-center gap-3">
        {renderTimerBlock(timeLeft.days, 'DAYS')}
        {renderTimerBlock(timeLeft.hours, 'HOURS')}
        {renderTimerBlock(timeLeft.minutes, 'MINUTES')}
        {renderTimerBlock(timeLeft.seconds, 'SECONDS')}
      </div>
    </div>
  );
};

