import { TitleBar } from '@/components';
import { DatabaseSelector, Desk, SetupWizard } from '@/pages';
import { activeScreen } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { fyo } from './initFyo';

function App() {
	const [activeScreenVal, setActiveScreen] = useAtom(activeScreen);

	const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
		const isDark = e.matches;
		document.documentElement.classList.toggle('dark', isDark);
	};

    

    const fileSelected = async (filePath: string): Promise<void> => {
        fyo.config.set('lastSelectedFilePath', filePath);
    }

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		// Inisialisasi dan tambahkan event listener
		handleChange(mediaQuery);
		mediaQuery.addEventListener('change', handleChange);
		
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);
	
	useEffect(() => {
		const lastSelectedFilePath = fyo.config.get('lastSelectedFilePath', null);
		console.log(lastSelectedFilePath)
		if (typeof lastSelectedFilePath !== 'string' || !lastSelectedFilePath.length) {
			setActiveScreen('DatabaseSelector');
		} 
		// else {
		// 	fileSelected(lastSelectedFilePath);
		// }
	}, [])

	return (
		<>
			<TitleBar className="border-b flex p-1 w-full h-8" />
			{activeScreenVal === "DatabaseSelector" && <DatabaseSelector />}
			{activeScreenVal === "Desk" && <Desk />}
			{activeScreenVal === "SetupWizard" && <SetupWizard />}
		</>
	)
}

export default App
