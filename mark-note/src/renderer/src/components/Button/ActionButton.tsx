import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ActionButtonProps = ComponentProps<'button'>


export const ActionButton = ({className, children, ...props}: ActionButtonProps) => {
    return <button className={twMerge('px-2 py-1 rounded-md transition-colors duration-100 focus:outline focus:outline-indigo-500', className
    )} {...props}
    >
        {children}
    </button>
}