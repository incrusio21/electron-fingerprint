import { darkModeAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function usePrefersDarkMode() {
    const setIsDarkMode = useSetAtom(darkModeAtom);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = () => {
            setIsDarkMode(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
}
