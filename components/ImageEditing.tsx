import React, { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import Icon from './common/Icon';
import Spinner from './common/Spinner';

interface Props {
    onBack: () => void;
}

const ImageEditing: React.FC<Props> = ({ onBack }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [editedUrl, setEditedUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('Add a retro, vintage film filter');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setOriginalUrl(URL.createObjectURL(file));
            setEditedUrl(null);
            setError('');
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!imageFile || !prompt) {
            setError('Please upload an image and provide an editing instruction.');
            return;
        }
        setIsLoading(true);
        setError('');
        setEditedUrl(null);
        try {
            const base64Image = await editImage(prompt, imageFile);
            setEditedUrl(`data:image/png;base64,${base64Image}`);
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

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Image Editing</h2>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold mb-2">1. Upload Image</h3>
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-2">2. How should we edit it?</h3>
                        <div className="flex items-center space-x-2">
                           <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., Remove the person in the background"
                                className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !imageFile}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <Icon name="image_edit_auto" className="w-5 h-5"/>
                                <span>{isLoading ? 'Editing...' : 'Edit'}</span>
                            </button>
                        </div>
                    </div>
                </div>
                 {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">{error}</p>}
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Original</h3>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md dark:shadow-lg min-h-[300px] flex items-center justify-center">
                        {originalUrl ? <img src={originalUrl} alt="Original" className="max-h-96 w-auto object-contain rounded-lg"/> : <p className="text-slate-500 dark:text-slate-400">Upload an image to start</p>}
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Edited</h3>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md dark:shadow-lg min-h-[300px] flex items-center justify-center">
                        {isLoading && <Spinner />}
                        {!isLoading && editedUrl && <img src={editedUrl} alt="Edited" className="max-h-96 w-auto object-contain rounded-lg"/>}
                        {!isLoading && !editedUrl && <p className="text-slate-500 dark:text-slate-400">Your edited image will appear here</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageEditing;