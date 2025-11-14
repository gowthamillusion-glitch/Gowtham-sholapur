import React, { useState, useCallback } from 'react';
import { analyzeImage } from '../services/geminiService';
import Icon from './common/Icon';
import Spinner from './common/Spinner';

interface Props {
    onBack: () => void;
}

const ImageAnalysis: React.FC<Props> = ({ onBack }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('Describe this image in detail.');
    const [result, setResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult('');
            setError('');
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!imageFile || !prompt) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');
        try {
            const analysisResult = await analyzeImage(prompt, imageFile);
            setResult(analysisResult);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, prompt]);

    return (
        <div className="animate-fade-in space-y-6">
            <button onClick={onBack} className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                <span>Back to Services</span>
            </button>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Image Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Controls Column */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg space-y-4">
                    <h3 className="text-xl font-semibold">1. Upload Image</h3>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500" />
                    </div>

                    <h3 className="text-xl font-semibold">2. Set Your Prompt</h3>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Describe this image..."
                        className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        rows={3}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !imageFile}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? <Spinner /> : <Icon name="bolt" className="w-5 h-5"/>}
                        <span>{isLoading ? 'Analyzing...' : 'Analyze Image'}</span>
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
                </div>

                {/* Result Column */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg min-h-[300px] flex flex-col justify-center items-center">
                    {!previewUrl && <p className="text-slate-500 dark:text-slate-400">Your image and analysis will appear here.</p>}
                    {previewUrl && (
                        <div className="w-full space-y-4">
                            <img src={previewUrl} alt="Preview" className="max-h-64 w-full object-contain rounded-lg mx-auto" />
                            {isLoading && <div className="flex justify-center"><Spinner /></div>}
                            {result && (
                                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg max-h-80 overflow-y-auto">
                                    <h4 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-300">Analysis Result:</h4>
                                    <pre className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap text-sm">{result}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageAnalysis;