import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateVideo } from '../services/geminiService';
import Icon from './common/Icon';
import Spinner from './common/Spinner';

// Fix: Resolved conflicting global type declarations for 'window.aistudio' by inlining the type definition instead of using a named interface to avoid naming collisions.
declare global {
    interface Window {
        aistudio: {
            hasSelectedApiKey: () => Promise<boolean>;
            openSelectKey: () => Promise<void>;
        };
    }
}

interface Props {
    onBack: () => void;
}

const reassuringMessages = [
    "Summoning digital artists...",
    "Teaching pixels to dance...",
    "Composing a symphony of frames...",
    "Polishing the final cut...",
    "Almost there, the premiere is near!"
];

const VideoGeneration: React.FC<Props> = ({ onBack }) => {
    const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
    const [checkingApiKey, setCheckingApiKey] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('The camera slowly zooms out, revealing a beautiful landscape.');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const messageIntervalRef = useRef<number | null>(null);
    
    const checkApiKey = useCallback(async () => {
        setCheckingApiKey(true);
        try {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setApiKeySelected(true);
            } else {
                setApiKeySelected(false);
            }
        } catch (e) {
            console.error("Error checking API key:", e);
            setApiKeySelected(false);
        } finally {
            setCheckingApiKey(false);
        }
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);
    
    useEffect(() => {
        if (isLoading) {
            let i = 0;
            messageIntervalRef.current = window.setInterval(() => {
                setLoadingMessage(reassuringMessages[i % reassuringMessages.length]);
                i++;
            }, 4000);
        } else if (messageIntervalRef.current) {
            clearInterval(messageIntervalRef.current);
            messageIntervalRef.current = null;
        }
        return () => {
            if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
        };
    }, [isLoading]);

    const handleSelectKey = async () => {
        try {
            await window.aistudio.openSelectKey();
            // Assume success and optimistically update UI
            setApiKeySelected(true);
            setError('');
        } catch (e) {
            setError("Could not open API key selection dialog.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setVideoUrl(null);
            setError('');
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            setError('Please upload an image.');
            return;
        }
        setIsLoading(true);
        setError('');
        setVideoUrl(null);
        try {
            const resultUrl = await generateVideo(prompt, imageFile, aspectRatio, setLoadingMessage);
            setVideoUrl(resultUrl);
        } catch (err: any) {
            if (err.message === "API_KEY_ERROR") {
                setError("Your API key is invalid. Please select a valid key.");
                setApiKeySelected(false);
            } else {
                setError(err.message || 'An unexpected error occurred during video generation.');
            }
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    if (checkingApiKey) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (!apiKeySelected) {
        return (
            <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl max-w-lg mx-auto shadow-lg">
                <h2 className="text-2xl font-bold mb-4">API Key Required for Veo</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Video generation is a premium feature. Please select a valid Google AI Studio API key to proceed.
                    For information on billing, visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 underline">Google AI billing docs</a>.
                </p>
                <button onClick={handleSelectKey} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-500">
                    Select API Key
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-6">
            <button onClick={onBack} className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                <span>Back to Services</span>
            </button>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Animate Your Image</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg space-y-4">
                    <h3 className="text-xl font-semibold">1. Upload Image</h3>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                         <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500" />
                    </div>

                    <h3 className="text-xl font-semibold">2. Animation Prompt (Optional)</h3>
                     <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A gentle breeze rustles the leaves." className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500" rows={2}/>

                    <h3 className="text-xl font-semibold">3. Aspect Ratio</h3>
                     <div className="flex gap-2">
                        {(['16:9', '9:16'] as const).map(ratio => (
                            <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${aspectRatio === ratio ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                {ratio} {ratio === '16:9' ? '(Landscape)' : '(Portrait)'}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleSubmit} disabled={isLoading || !imageFile} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50">
                        {isLoading ? <Spinner/> : <Icon name="movie" className="w-5 h-5"/>}
                        <span>{isLoading ? 'Generating Video...' : 'Animate'}</span>
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg min-h-[400px] flex flex-col justify-center items-center">
                    {!previewUrl && <p className="text-slate-500 dark:text-slate-400">Your preview & video will appear here.</p>}
                    {previewUrl && !videoUrl && !isLoading && <img src={previewUrl} alt="Preview" className="max-h-96 w-auto object-contain rounded-lg"/>}
                    {isLoading && (
                        <div className="text-center space-y-4">
                            <Spinner />
                            <p className="font-semibold text-purple-500 dark:text-purple-300">Generating video...</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{loadingMessage}</p>
                        </div>
                    )}
                    {videoUrl && <video src={videoUrl} controls autoPlay loop className="w-full rounded-lg" />}
                </div>
            </div>
        </div>
    );
};

export default VideoGeneration;