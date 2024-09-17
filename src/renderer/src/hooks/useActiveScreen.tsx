import { fyo } from "@renderer/initFyo";
import { activeScreen } from "@renderer/store";
import { useSetAtom } from "jotai";


export const useActiveScreen = () => {
    const setActiveScreen = useSetAtom(activeScreen)
    
    const showDBSelector = () => {
        localStorage.clear();
        fyo.config.set('lastSelectedFilePath', null);
        setActiveScreen('DatabaseSelector')
    }
    
    return {
        showDBSelector
    }
}