import React from 'react';
import Icon from './Icon';
import { type Service } from '../../types';

interface CardProps {
    service: Service;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ service, onClick }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 p-6 flex flex-col items-start space-y-4 transition-all duration-300 h-full transform hover:-translate-y-1">
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                <Icon name={service.icon} className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 flex-grow">{service.description}</p>
            <button
                onClick={onClick}
                className="mt-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 self-stretch text-center"
            >
                Launch
            </button>
        </div>
    );
};

export default Card;