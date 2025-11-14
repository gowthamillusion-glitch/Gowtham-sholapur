import React from 'react';

interface IconProps {
    name: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
    // Fix: Changed JSX.Element to React.ReactElement to resolve the 'Cannot find namespace JSX' error.
    const icons: { [key: string]: React.ReactElement } = {
        logo: (
            <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0Z" fill="url(#paint0_linear_1_2)"/>
                <path d="M72.2,148.4c-9.6,0-17.6-3-24-9c-6.4-6-9.6-13.6-9.6-22.8c0-9.2,3.2-16.8,9.6-22.8c6.4-6,14.4-9,24-9c8.4,0,15.2,2.4,20.4,7.2 l-12,13.2c-2.4-2-5.2-3-8.4-3c-4,0-7.333,1.4-10,4.2c-2.667,2.8-4,6.6-4,11.4c0,4.8,1.333,8.6,4,11.4c2.667,2.8,6,4.2,10,4.2 c3.2,0,6-1,8.4-3l12,13.2C87.4,146,80.6,148.4,72.2,148.4z M134.6,146V86h22.8v-18h-54v18h22.8v60H134.6z" fill="white"/>
                <defs><linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#4F46E5"/></linearGradient></defs>
            </svg>
        ),
        document_scanner: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5A.75.75 0 014.5 3.75h15a.75.75 0 01.75.75v15a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12h7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 16.5h4.5" /></svg>,
        aspect_ratio: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm0 6h18m-6 0v12" /></svg>,
        image_edit_auto: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l5.25-5.25M12 21.75l-5.25-5.25M12 21.75V12M12 12l5.25-5.25M12 12l-5.25-5.25M12 12V2.25" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" /></svg>,
        movie: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 3v18M18 3v18M3 6h18M3 18h18M3 3h18v18H3V3z" /></svg>,
        bolt: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
        'arrow-left': <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
        sun: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
        moon: <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>,
    };

    return icons[name] || null;
};

export default Icon;