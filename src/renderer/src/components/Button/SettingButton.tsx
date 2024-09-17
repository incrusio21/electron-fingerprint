import { ActionButton, ActionButtonProps } from "@/components";
import { VscGear } from "react-icons/vsc";

export const SettingButton = ({...props}: ActionButtonProps) => {
    const settingPage = async () => {
        
    }

    return (
        <ActionButton onClick={settingPage} {...props}>
            <VscGear className="w-4 h-4"></VscGear>
        </ActionButton>
    )
}