import React from 'react';
import { PowerUp, Theme } from '../types';

interface PowerUpButtonProps {
    theme: Theme;
    powerUp: PowerUp;
    onClick: () => void;
    label: string;
}

const PowerUpButton: React.FC<PowerUpButtonProps> = ({ theme, powerUp, onClick, label }) => {
    const themeColors = theme.colors;
    
    const baseClasses = `w-full p-3 rounded-lg font-bold text-white transition-all duration-200 shadow-md`;
    const enabledClasses = `${themeColors.buttonBg} hover:${themeColors.buttonHoverBg} transform hover:scale-105`;
    const disabledClasses = `bg-slate-600 opacity-50 cursor-not-allowed`;

    return (
        <button
            onClick={onClick}
            disabled={!powerUp.isAvailable}
            className={`${baseClasses} ${powerUp.isAvailable ? enabledClasses : disabledClasses}`}
            aria-label={`${label} Power-up ${powerUp.isAvailable ? 'Available' : 'Not available'}`}
        >
            {label}
        </button>
    );
};

export default PowerUpButton;