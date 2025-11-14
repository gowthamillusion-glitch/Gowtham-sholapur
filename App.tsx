import React, { useState, useEffect } from 'react';
import { type ServiceId } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ImageAnalysis from './components/ImageAnalysis';
import ImageGeneration from './components/ImageGeneration';
import ImageEditing from './components/ImageEditing';
import VideoGeneration from './components/VideoGeneration';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ServiceId | 'home'>('home');
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const navigateTo = (view: ServiceId | 'home') => {
        setCurrentView(view);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'analyze':
                return <ImageAnalysis onBack={() => navigateTo('home')} />;
            case 'generate':
                return <ImageGeneration onBack={() => navigateTo('home')} />;
            case 'edit':
                return <ImageEditing onBack={() => navigateTo('home')} />;
            case 'animate':
                return <VideoGeneration onBack={() => navigateTo('home')} />;
            case 'home':
            default:
                return <Home onServiceSelect={navigateTo} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
            <Header onLogoClick={() => navigateTo('home')} onToggleTheme={toggleTheme} currentTheme={theme} />
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;