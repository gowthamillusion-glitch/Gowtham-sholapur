import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import Icon from './common/Icon';
import Spinner from './common/Spinner';

interface Props {
    onBack: () => void;
}

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGeneration: React.FC<Props> = ({ onBack }) => {
    const [prompt, setPrompt] = useState<string>('A photorealistic image of a futuristic city skyline at dusk, with flying vehicles.');
    const [aspectRatio, setAspectRatio] = useState<string>('16:9');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = useCallback(async () => {
        if (!prompt) {
            setError('Please provide a prompt.');
            return;
        }
        setIsLoading(true);
        setError('');
        setImageUrl(null);
        try {
            const base64Image = await generateImage(prompt, aspectRatio);
            setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio]);

    return (
        <div className="animate-fade-in space-y-6">
            <button onClick={onBack} className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                <span>Back to Services</span>
            </button>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Image Generation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Controls Column */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg space-y-4">
                    <h3 className="text-xl font-semibold">1. Describe Your Image</h3>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A majestic lion with a crown of stars..."
                        className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        rows={4}
                    />

                    <h3 className="text-xl font-semibold">2. Choose Aspect Ratio</h3>
                    <div className="flex flex-wrap gap-2">
                        {aspectRatios.map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${aspectRatio === ratio ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                            >
                                {ratio}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                         {isLoading ? <Spinner /> : <Icon name="aspect_ratio" className="w-5 h-5"/>}
                        <span>{isLoading ? 'Generating...' : 'Generate Image'}</span>
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
                </div>

                {/* Result Column */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg min-h-[400px] flex flex-col justify-center items-center">
                    {isLoading && <Spinner />}
                    {!isLoading && !imageUrl && <p className="text-slate-500 dark:text-slate-400">Your generated image will appear here.</p>}
                    {imageUrl && (
                         <img src={imageUrl} alt="Generated" className="max-h-[500px] w-full object-contain rounded-lg" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGeneration;