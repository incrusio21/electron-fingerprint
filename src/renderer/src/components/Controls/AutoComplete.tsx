import { useContolValue, useDfValue, useIntelValue } from "@/hooks/useControl";
import { docAtom, initialInpuScope } from "@/store";
import { fuzzyMatch } from "@/utils";
import { DropdownItem } from "@/utils/types";
import { getOptionList } from "@fyo/utils";
import { handleRef } from "@renderer/utils/ui";
import { ScopeProvider } from "bunshi/react";
import { useAtomValue } from "jotai";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dropdown, DropdownTarget } from "../Dropdown";
import { BaseProps, withBase } from "./Base";

const AutoCompleteBase = forwardRef<HTMLInputElement, BaseProps>(
    ({ inputType = "text", value }, ref) => {
        const doc = useAtomValue(docAtom)
        const df = useDfValue()
        const { triggerChange } = useContolValue()
        
        const [isLoading, setIsLoading] = useState(false);
        const [suggestions, setSuggestions] = useState<DropdownItem[]>([]);
        
        const options : Array<any> = useMemo(() => {
            if (!df) return [];
      
            return getOptionList(df, doc);
        }, [])
    
        const updateSuggestions = async (keyword?: string ) => {
            if (typeof keyword === 'string') {
            //     this.setLinkValue(keyword, true);
            }

            setIsLoading(true)
            const suggestions = await getSuggestions(keyword);
            setSetSuggestionAction(suggestions)
            setIsLoading(false)
        }

        const setSetSuggestionAction = (suggestions) => {
            for (const option of suggestions) {
                if (option.action) {
                    continue;
                }
        
                option.action = () => {
                    setSuggestionValue(option, handleRef(ref)!);
                };
            }
        
            return setSuggestions(suggestions);
        }

        const getSuggestions = async (keyword = '') => {
            keyword = keyword.toLowerCase();
            if (!keyword) return options;
            
            return options
                .map((item) => ({ ...fuzzyMatch(keyword, item.label), item }))
                .filter(({ isMatch }) => isMatch)
                .sort((a, b) => a.distance - b.distance)
                .map(({ item }) => item);
        }

        const setSuggestionValue = (suggestion : DropdownItem | undefined, target: HTMLInputElement) => {
            // if (suggestion?.actionOnly) {
            //     this.setLinkValue(this.value);
            //     return;
            // }

            if (suggestion) {
                // setLinkValue(suggestion.label);
                triggerChange(suggestion.value);
                target.value = suggestion.value || ""
            }
        }

        const onFocus = (target: EventTarget & HTMLInputElement) => {
            updateSuggestions(target.value)
        }
    
        const onBlur = useCallback(async (target: EventTarget & HTMLInputElement) => {
            if (suggestions.length === 0) {
                triggerChange(target.value)
            }else if (target.value){
                const suggestion = suggestions.find((s) => s.label === target.value);
                if (suggestion) {
                    setSuggestionValue(suggestion, target);
                } else {
                    const suggestions = await getSuggestions(target.value);
                    setSuggestionValue(suggestions[0], target);
                }
            }
            
        }, [suggestions])
    
        const onInput = (target: EventTarget & HTMLInputElement) => {
            updateSuggestions(target.value)
        }

        return (
            <ScopeProvider scope={initialInpuScope} value={{
                inputType, value, onInput, onFocus, onBlur
            }}>
                <Dropdown 
                    df={df}
                    items={suggestions} isLoading={isLoading}
                    input={AutoCompleteInput}
                    ref={ref}
                />
            </ScopeProvider>
        );
})

const AutoCompleteInput = forwardRef<HTMLInputElement, DropdownTarget>(
    ({ highlightItemUp, highlightItemDown, selectHighlightedItem, toggleDropdown }, ref) => {
    const df = useDfValue()
    const {
        isReadOnly, showLabel, showMandatory, 
        inputClasses, containerClasses, labelClasess,
        inputPlaceholder
    } = useContolValue()

    const { inputType, value, onInput, onFocus, onBlur } = useIntelValue();
    
    const actionBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        if(isReadOnly) return

        await onBlur(target)
        toggleDropdown(false);
    }

    const actionFocus = (e : React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement|SVGSVGElement>) => {
        e?.preventDefault();
        if(isReadOnly) return

        toggleDropdown(true);
        onFocus(handleRef(ref)!)
    }

    const actionInput = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        if(isReadOnly) return
        onInput(target)
    }
    
    function onKeyDown(e : React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowUp') {
            highlightItemUp();
        } else if (e.key === 'ArrowDown') {
            highlightItemDown();
        } else if (e.key === 'Enter') {
            selectHighlightedItem();
        } else if (e.key === 'Escape') {
            toggleDropdown(false);
        }
    }

    return (
        <>
            {showLabel && <div className={labelClasess}>{df.label}</div>}
            <div className={twMerge("flex items-center justify-between pe-2 rounded", containerClasses)}>
                <input
                    className={twMerge("bg-transparent", inputClasses)}
                    ref={ref}
                    spellCheck="false"
                    type={inputType}
                    placeholder={inputPlaceholder}
                    defaultValue={value !== null && value !== undefined ? String(value) : ''}
                    readOnly={isReadOnly}
                    onBlur={actionBlur}
                    onFocus={actionFocus}
                    onClick={actionFocus}
                    onInput={actionInput}
                    tabIndex={isReadOnly ? -1 : 0}
                    onKeyDown={onKeyDown}
                />
                {!isReadOnly &&
                <svg
                    className="w-3 h-3" style={{background: "inherit; margin-right: -3px"}}
                    viewBox="0 0 5 10"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={actionFocus}
                >
                    <path
                        d="M1 2.636L2.636 1l1.637 1.636M1 7.364L2.636 9l1.637-1.636"
                        className={twMerge("stroke-current", showMandatory ? 'text-red-400' : 'text-gray-400')}
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>}
            </div>
        </>
    )
})

export const AutoComplete = withBase(AutoCompleteBase);