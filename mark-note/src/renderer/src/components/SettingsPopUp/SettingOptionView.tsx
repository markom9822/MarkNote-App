import { SettingOptionInfo } from "@shared/models";
import { ComponentProps } from "react";
import { cn , formatDateFromMs} from '@renderer/utils'

export type SettingsOptionViewProps = SettingOptionInfo & {
    isActive?: boolean
} & ComponentProps<'div'>

export const SettingOptionView = ({
    title, 
    icon, 
    isActive = false, 
    className, 
    ...props
}: SettingsOptionViewProps) => {

    const Icon = icon;

    return( <div className={cn('cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75', 
    {
        'bg-zinc-500/75 text-zinc-100': isActive,
        'hover:bg-zinc-600/75 text-zinc-400': !isActive,
    },
    className
    )}
    {...props}
    >
        <div className="flex justify-between mt-1">
            <h3 className="mb-1 font-bold truncate">{title}</h3>
            <Icon size={22}/> 
        </div>
    </div>
    )
}