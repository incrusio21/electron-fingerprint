import { Button, FormContainer, FormHeader } from "@/components";
import { useActiveScreen } from "@/hooks/useActiveScreen";
import { getSetupWizardDoc } from "@/utils/misc";
import { getFieldsGroupedByTabAndSection } from "@/utils/ui";
import { DocValue } from "@fyo/core/types";
import { Doc } from "@fyo/models/doc";
import { fyo } from "@renderer/initFyo";
import { getErrorMessage } from "@renderer/utils";
import { Field } from "@schemas/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CommonFormSection } from ".";

type Props = { children?: React.ReactNode }
export const SetupWizard = ({ children } : Props) => {
    const [docOrNull, setDocOrNull] = useState<Doc | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { showDBSelector } = useActiveScreen()
    
    // Derived state
    const hasDoc : boolean = useMemo(() => docOrNull instanceof Doc, [docOrNull]);
    
    const activeGroup = useMemo(() => {
        return hasDoc && docOrNull
        ? getFieldsGroupedByTabAndSection(docOrNull.schema, docOrNull).values().next().value 
        : new Map();
    }, [hasDoc, docOrNull]);

    const setupCancelled = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        showDBSelector()
	};
    
    const handleValueChange = useCallback(async (field: Field, value: DocValue) => {
        if (!hasDoc || !docOrNull) return

        const { fieldname } = field;
        const newErrors = { ...errors };
        delete newErrors[fieldname];
        setErrors(newErrors);
        
        try {
            await docOrNull.set(fieldname, value);
        } catch (err) {
            if (err instanceof Error) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [fieldname]: getErrorMessage(err, docOrNull),
                }));
            }
        }
        

    }, [hasDoc, docOrNull, errors])

    // Lifecycle
    useEffect(() => {
        const fetchDoc = async () => {
            const languageMap = {}; // Assuming this is retrieved elsewhere
            const doc = getSetupWizardDoc(languageMap);

            setDocOrNull(doc);
        }

        fetchDoc();
    }, [fyo])
    
    return (
        <FormContainer showHeader={false} className="justify-content items-center h-full">
            <FormHeader formTitle="Set up your site setting" className="sticky top-0 bg-white dark:bg-[#252526] border-b dark:border-[#333333]" />
            {/* Section Container */}
            {docOrNull && (
            <div className="overflow-auto custom-scroll">
                {[...activeGroup.entries()].map(([name, fields], idx) => (
                    <CommonFormSection 
                        key={name + idx}
                        title={name}
                        doc={docOrNull}
                        fields={fields}
                        className={twMerge("p-4", idx !== 0 && 'border-t')}
                        showTitle={name !== 'Default'}
                        collapsible={true}
                        onValueChange={handleValueChange}
                        errors={errors}
                    />
                ))}
            </div>)}
            {children}
            {/* Buttons Bar */}
            <div className="
                mt-auto
                p-4
                flex
                border-t
                items-center
                justify-between
                flex-shrink-0
                sticky
                bottom-0
                dark:bg-[#252526]
                ">
                    <Button className="w-24" onClick={setupCancelled}>Cancel</Button>
                    <Button tipe="primary" className="w-24" disabled onClick={setupCancelled}>Submit</Button>
            </div>
        </FormContainer>
    );
};