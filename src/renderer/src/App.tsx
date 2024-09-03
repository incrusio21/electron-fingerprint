import { darkModeAtom } from '@/utils';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { TitleBar } from './components';

function App() {
	const [_, setIsDarkMode] = useAtom<boolean>(darkModeAtom);
	
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDarkMode(mediaQuery.matches);

		// Fungsi untuk menerapkan mode gelap atau terang
		const applyTheme = (isDark : boolean) => {
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			setIsDarkMode(isDark)
		};
	
		// Inisialisasi berdasarkan preferensi awal
		applyTheme(mediaQuery.matches);
	
		// Tambahkan event listener untuk mendeteksi perubahan
		const handleChange = (e) => applyTheme(e.matches);
		mediaQuery.addEventListener('change', handleChange);
	
		// Cleanup event listener saat komponen unmount
		return () => mediaQuery.removeEventListener('change', handleChange);
	  }, []);
	  
	return (
		<>
			<TitleBar className="block fixed p-1 w-full text-black dark:text-white h-8" />
			<div className="flex h-full items-center justify-center">
				<span className="text-4xl text-blue-500" >Hello Fingerprint Log</span>
			</div>
		</>
	)
}

export default App
