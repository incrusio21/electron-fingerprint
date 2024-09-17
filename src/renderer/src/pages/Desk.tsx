import { ActionButtonsRow, Content, SideBar, TabBreak } from "@renderer/components";
import { ComponentProps, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const Desk = ({ className ,...props }: ComponentProps<'main'>) => {
    const contentContainerRef = useRef<HTMLDivElement>(null)
    
    const resetScroll = () => {
		contentContainerRef.current?.scrollTo(0, 0)
	}
    
    return (
        <main {...props} className={twMerge('flex flex-row h-screen', className)}>
            <SideBar className='p-2 border-r bg-gray-400/10 dark:bg-[#181818] dark:border-r-white/20'>
                <ActionButtonsRow className='flex justify-between mt-1' />
            </SideBar>
            <Content ref={contentContainerRef} className="h-full w-full">
                <TabBreak />
            </Content>
        </main>
    );
};