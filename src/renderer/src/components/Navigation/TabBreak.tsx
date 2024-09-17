import { PageContent } from '@/static_pages/model';
import { ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type TabBreakProps = { tabContent?: Array<PageContent> } & ComponentProps<'div'>
export const TabBreak = ({ className, children, tabContent, ...props }: TabBreakProps) => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    if(!tabContent || tabContent.length == 0){
        return (
            <div>Empty Content</div>
        )
    }

    return (
        <div {...props} className={twMerge("w-full p-6", className)}>
            {/* Navigasi Tab Horizontal */}
            <div className="flex space-x-4 mb-6 border-b">
                {tabContent.map((value, index) => (
                    <button 
                        key={index}    
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === index ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab(index)}>
                        {value.title}
                    </button>
                ))}
            </div>
            {/* Konten Tab */}
            <div className="tab-content">
                <div className="tab-pane">
                    <form>
                        {tabContent[activeTab].content}
                    </form>
                </div>
            </div>
        </div>
    )
}