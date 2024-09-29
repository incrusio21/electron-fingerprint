import { useContolValue, useDfValue } from "@/hooks/useControl";
import { getDataURL } from "@/utils/misc";
import { forwardRef, useMemo } from "react";
import { FaUpload, FaX } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { BaseProps, withBase } from "./Base";

const mime_types: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    svg: 'image/svg+xml',
};

type AttachImageProps = {
    letterPlaceholder?: string
} & BaseProps

const AttachImageBase = forwardRef<HTMLInputElement, AttachImageProps>(
    ({ letterPlaceholder="", size, value }, ref) => {
        const df = useDfValue()
        const { change } = df
        const {
            isReadOnly
        } = useContolValue()
        
        const shouldClear = useMemo(() => !!value, [value])
        const imageSizeStyle = useMemo(() => {
            return size === 'form' ? { width: '135px', height: '135px' } : {}
        } ,[])

        const triggerChange = (value: any) => {
            value = parseValue(value);
            if (value === '') value = null;
            if (change) change(value);
        }

        const parseValue = (value: any) => {
            return value; // Implement any parsing logic if necessary
        }

        const clearImage = async () => {
            triggerChange(null)
        }

        const selectImage = async () => {
            if (isReadOnly) return
            const options = {
                title: `Select Image`,
                filters: [{ name: 'Image', extensions: Object.keys(mime_types) }],
            }

            const { name, success, data } = await context.selectFile(options);
            if (!success) return;

            const extension = name.split('.').at(-1);
            const type = mime_types[extension!];
            const dataURL = await getDataURL(type, data);

            triggerChange(dataURL)
        }

        const handleClick = async () => {
            if(value){
                return await clearImage()
            }
            return await selectImage()
        }

        const Compnent = shouldClear ? FaX : FaUpload

        return (
            <div
                title={df.label}
                className={twMerge(
                    "relative bg-white border flex-center overflow-hidden group")}
                style={imageSizeStyle}
            >
                    {value && typeof value === 'string' ?
                    <img src={value} /> :
                    <div
                        className={twMerge(!isReadOnly && "group-hover:opacity-90")}
                    >
                        {letterPlaceholder ? 
                        <div
                            className={twMerge(`
                                flex
                                h-full
                                items-center
                                justify-center
                                text-gray-400
                                font-semibold
                                w-full
                                text-4xl
                                select-none
                            `)}
                        >
                            {letterPlaceholder}
                        </div> :
                        <svg
                            className="w-6 h-6 text-gray-300"
                            viewBox="0 0 24 21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 3h-4l-2-3H9L7 3H3a3 3 0 00-3 3v12a3 3 0 003 3h18a3 3 0 003-3V6a3 3 0 00-3-3zm-9 14a5 5 0 110-10 5 5 0 010 10z"
                                fill="currentColor"
                                fill-rule="nonzero"
                            />
                        </svg>}
                    </div>}
                    <div
                        className={twMerge("hidden w-full h-full absolute justify-center items-end", !isReadOnly && 'group-hover:flex')}
                        style={{background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(2px)"}}
                    >
                        <button className="bg-gray-100 p-0.5 rounded mb-1" onClick={handleClick}>
                            <Compnent className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
            </div>
        )
})

export const AttachImage = withBase(AttachImageBase);