import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IconProps {
    name: IconType; // Use IconType for the name prop
    className?: string; // Optional className for styling
}

export const Icon = ({ name: IconComponent, className } : IconProps) => {
    return (
        <IconComponent className={twMerge(className)}  />
    )
}