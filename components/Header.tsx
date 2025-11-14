import React from 'react';
import Icon from './common/Icon';

interface HeaderProps {
    onLogoClick: () => void;
    onToggleTheme: () => void;
    currentTheme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onToggleTheme, currentTheme }) => {
    return (
        <header className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div onClick={onLogoClick} className="flex items-center space-x-3 cursor-pointer">
                    <Icon name="logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        GVK<span className="text-purple-500 dark:text-purple-400">Pictorial</span>
                    </h1>
                </div>
                <button 
                    onClick={onToggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    <Icon name={currentTheme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </button>
            </div>
        </header>
    );
};

export default Header;