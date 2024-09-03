import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export { darkModeAtom } from "./context"
export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args))
}
