import React from 'react';
import { type Service, type ServiceId } from '../types';
import Card from './common/Card';

interface HomeProps {
    onServiceSelect: (service: ServiceId) => void;
}

const services: Service[] = [
    {
        id: 'analyze',
        title: 'Analyze Image',
        description: 'Upload a photo to understand its content, context, and details with lightning speed.',
        icon: 'document_scanner',
    },
    {
        id: 'generate',
        title: 'Generate Image',
        description: 'Bring your ideas to life. Describe an image and watch our AI create it in various aspect ratios.',
        icon: 'aspect_ratio',
    },
    {
        id: 'edit',
        title: 'Edit Image',
        description: 'Effortlessly modify your images with simple text prompts. Add filters, remove objects, and more.',
        icon: 'image_edit_auto',
    },
    {
        id: 'animate',
        title: 'Animate Image',
        description: 'Transform your static photos into dynamic, captivating videos with our state-of-the-art AI.',
        icon: 'movie',
    },
];

const Home: React.FC<HomeProps> = ({ onServiceSelect }) => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                    Your AI-Powered Creative Suite
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Select a service to begin creating, editing, and analyzing your visual content with the power of Gemini.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <Card key={service.id} service={service} onClick={() => onServiceSelect(service.id)} />
                ))}
            </div>
        </div>
    );
};

export default Home;