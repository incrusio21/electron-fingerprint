import { fyo } from "@renderer/initFyo";
import { docAtom } from "@renderer/store";
import { DropdownItem } from "@renderer/utils/types";
import { Field } from "@schemas/types";
import { useAtomValue } from "jotai";
import { forwardRef, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Popover } from "./Popover";

type DropdownProps = {
    df: Field;
    items: DropdownItem[];
    isLoading: boolean
    input: React.ForwardRefExoticComponent<DropdownTarget & React.RefAttributes<HTMLInputElement>>;
} 

export type DropdownTarget = { 
    highlightItemUp: (e?: Event) => void;
    highlightItemDown: (e?: Event) => void;
    selectHighlightedItem: (e?: Event) => void;
    toggleDropdown: (e: SetStateAction<boolean>) => void
}

export const Dropdown = forwardRef<any, DropdownProps>(({ df, items, isLoading, input }, ref) => {
    const doc = useAtomValue(docAtom)
    
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    const getGroupedItems = useCallback((items: DropdownItem[]) : Record<string, DropdownItem[]> => {
        const groupedItems: Record<string, DropdownItem[]> = {};
        for (let item of items) {
            const group = item.group ?? '';

            groupedItems[group] ??= [];
            groupedItems[group].push(item);
        }

        return groupedItems;
    }, [])

    const dropdownItems : DropdownItem[] = useMemo(() => {
        const groupedItems = getGroupedItems(items ?? []);
        const groupNames = Object.keys(groupedItems).filter(Boolean).sort();

        const setItems: DropdownItem[] = groupedItems[''] ?? [];
        for (let group of groupNames) {
            setItems.push({
            label: group,
            isGroup: true,
            });

            const grouped = groupedItems[group] ?? [];
            setItems.push(...grouped);
        }

        return setItems;
    }, [items])


    const getEmptyMessage : string = useMemo(() => {
        const { schemaName, fieldname } = df ?? {};
        if (!schemaName || !fieldname || !doc) {
            return `Empty`;
        }

        const emptyMessage = fyo.models[schemaName]?.emptyMessages[fieldname]?.(
            doc
        );

        if (!emptyMessage) {
            return `Empty`;
        }

        return emptyMessage;
    }, [])
    
    const highlightItemUp = (e?: Event) => {
        e?.preventDefault();
        setHighlightedIndex((prev) => Math.max(0, prev - 1));
    };
    
    const highlightItemDown = (e?: Event) => {
        e?.preventDefault();
        setHighlightedIndex((prev) => Math.min(dropdownItems.length - 1, prev + 1));
    };

    const selectHighlightedItem = async () => {
        let item = items[highlightedIndex];
        if (!item && dropdownItems.length === 1) {
            item = dropdownItems[0];
        }

        return await selectItem(item);
    }

    const selectItem = async (d?: DropdownItem) => {
        if (!d || !d?.action) return;
        await d.action();
    }

    const scrollToHighlighted = () => {
        const highlightedElement = itemsRef.current[highlightedIndex];
        highlightedElement?.scrollIntoView({ block: 'nearest' });
    };
    
    useEffect(() => {
        isOpen && 
        requestAnimationFrame (() => {
            scrollToHighlighted();
        })
    }, [isOpen, highlightedIndex]);
    
    const Target = input;

    return (
        <Popover
            isOpen={isOpen}
            target={
                <div className="h-full">
                    <Target 
                        highlightItemUp={highlightItemUp} 
                        highlightItemDown={highlightItemDown} 
                        selectHighlightedItem={selectHighlightedItem}
                        toggleDropdown={setIsOpen}
                        ref={ref}  />
                </div>
            }>
            <div className="bg-white rounded w-full min-w-40 overflow-hidden">
                <div className="p-1 max-h-64 overflow-auto custom-scroll text-sm">
                    {isLoading ? <div v-if="" className="p-2 text-gray-600 italic">
                        Loading...
                    </div> : dropdownItems.length === 0 ?
                    <div className="p-2 text-gray-600 italic">
                        { getEmptyMessage }
                    </div> : 
                    dropdownItems.map((d, index) => (
                        <div className="text-gray-900" 
                            key={`key-${index}`}
                            ref={(el) => (itemsRef.current[index] = el)}
                        >
                            {d.isGroup ? (
                            <div className="px-2 pt-3 pb-1 text-xs uppercase text-gray-700 font-semibold">
                                {d.label}
                            </div>
                            ):
                            <a 
                                className={twMerge(
                                    "block p-2 rounded-md mt-1 first:mt-0 cursor-pointer truncate",
                                    index === highlightedIndex && 'bg-gray-100'
                                )}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => selectItem(d)}
                            >
                                {d.component ? (
                                    <div dangerouslySetInnerHTML={{ __html: d.component.template }} />
                                ) : (
                                    <>{d.label}</>
                                )}
                            </a>}
                        </div>
                    ))}
                </div>
            </div>
        </Popover>
    )
})