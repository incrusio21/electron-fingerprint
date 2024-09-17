import { ActionButton, ActionButtonProps } from "@/components";
import { LuFileSignature } from "react-icons/lu";

export const NewButton = ({...props}: ActionButtonProps) => {
    return (
        <ActionButton {...props}>
            <LuFileSignature className="w-4 h-4"></LuFileSignature>
        </ActionButton>
    )
}