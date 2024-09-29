import { getSelectedFilePath } from "@/utils/ui";
import { activeScreen } from "@renderer/store";
import { useSetAtom } from "jotai";
import { ComponentProps } from "react";
import { FaPlus, FaUpload } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export const DatabaseSelector = ({ className, ...props }: ComponentProps<'div'>) => {
    const setActiveScreen = useSetAtom(activeScreen)

    const newDatabase = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setActiveScreen("SetupWizard")
	};

    const existingDatabase = async (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const filePath = (await getSelectedFilePath())?.filePaths?.[0];
        emitFileSelected(filePath)
	};

    const emitFileSelected = (filePath: string) => {
        if (!filePath) return;


	};

    return (
        <div {...props} className={twMerge('flex-1 flex justify-center items-center', className)}>
            <div className="w-full w-form h-[90%] bg-form shadow-lg rounded-lg border relative">
                {/* Welcome to Aplication */}
                <div className="px-4 py-4">
                    <h1 className="text-2xl font-semibold select-none">
                        Welcome to {import.meta.env.VITE_APPNAME}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-50 text-base select-none">
                        Create a new connected site or select an existing one from your computer
                    </p>
                </div>
                <hr />

                {/* New File (Blue Icon) */}
                <div className="px-4 h-row-largest flex flex-row items-center gap-4 p-2 hover:bg-gray-50 hover:dark:bg-gray-800 cursor-pointer" 
                    onClick={newDatabase}>
                    <div className="w-8 h-8 rounded-full bg-blue-400 relative flex-center">
                        <FaPlus className="mx-auto text-white w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium">New Connected Site</p>
                        <p className="text-sm text-gray-600 dark:text-gray-50">
                            Create a new connected site and store it on your computer
                        </p>
                    </div>
                </div>

                {/* Existing File (Green Icon) */}
                <div className="px-4 h-row-largest flex flex-row items-center gap-4 p-2 hover:bg-gray-50 hover:dark:bg-gray-800 cursor-pointer"
                    onClick={existingDatabase}>
                    <div className="w-8 h-8 rounded-full bg-green-500 relative flex-center ">
                        <FaUpload className="mx-auto text-white w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium">Existing Company</p>
                        <p className="text-sm text-gray-600 dark:text-gray-50">
                            Load an existing company from your computer
                        </p>
                    </div>
                </div>

                {/* File List */}
                <div className="overflow-y-auto" style={{maxHeight: "3040px"}}>

                </div>
            </div>
        </div>
    );
};