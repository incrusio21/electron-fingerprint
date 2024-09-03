import { ComponentProps } from "react";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./TitleBarIcon";
import './main.css';

export const TitleBar = ({ ...props }: ComponentProps<'header'>) => {

    return (
        <header { ...props }>
            <div className="w-full h-full grid drag-region grid-flow-col-dense">
                <div className="text-center">
                    <span>Electron quick start</span>
                </div>
                {window.context.isNotMac && 
                <div className="absolute grid-cols-3 drag-button top-0 right-0">
                    <MinimizeIcon className="w-9 h-8 hover:bg-gray-200 hover:dark:bg-gray-600"/>
                    <MaximizeIcon className="w-9 h-8 hover:bg-gray-200 hover:dark:bg-gray-600"/>
                    <CloseIcon className="w-9 h-8 hover:bg-red-700"/>
                </div>}
            </div>
        </header>
    );
};