import React from 'react';
import { Theme } from '../types';

interface TimerProps {
  theme: Theme;
  time: number;
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ theme, time, initialTime }) => {
    const themeColors = theme.colors;
  const percentage = initialTime > 0 ? Math.max(0, (time / initialTime)) * 100 : 0;

  let colorClass = themeColors.timerBar;
  if (percentage < 50) colorClass = themeColors.timerBarWarning;
  if (percentage < 25) colorClass = themeColors.timerBarDanger;

  return (
    <div className={`w-full h-4 rounded-full overflow-hidden shadow-inner ${themeColors.timerBarBg}`}>
      <div
        className={`h-full rounded-full transition-all duration-150 ease-linear ${colorClass}`}
        style={{ width: `${percentage}%` }}
        aria-valuenow={time}
        aria-valuemin={0}
        aria-valuemax={initialTime}
        role="progressbar"
        aria-label="Time remaining"
      />
    </div>
  );
};

export default Timer;