import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ButtonTooltipProps = ComponentProps<'button'> & {
    message: string;
}


export const ButtonTooltip = ({message, className, children}: ButtonTooltipProps) => {
    
    return (
    <div className={twMerge('group relative flex justify-center', className)}>
        {children}
        <span className={twMerge('absolute top-6 scale-0 transition-all rounded bg-zinc-700 p-2 text-xs text-white group-hover:scale-100', className)}>{message}</span>
    </div>
    )
}