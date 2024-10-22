import { ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export const RootLayout = ({children, className, ...props}: ComponentProps<'main'>) => {
    return (
        <main className={twMerge('flex flex-row h-screen', className)} {...props}>
            {children}
        </main>
    )
}

export const Sidebar = ({className, children, ...props}: ComponentProps<'aside'>) => {
    return (
        <aside 
            className={twMerge('w-[220px] h-[100vh + 10px]', className)}
            {...props}
        >
            {children}
        </aside>
    )
}

export const Editor = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props}, ref) => (
    <div ref={ref} className={twMerge('', className)} {...props}>
        {children}
    </div>
    ) 
)

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props}, ref) => (
    <div ref={ref} className={twMerge(' w-[600px] flex-1', className)} {...props}>
        {children}
    </div>
    ) 
)

export const Preview = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props}, ref) => (
    <div ref={ref} className={twMerge('', className)} {...props}>
        {children}
    </div>
    ) 
)

Content.displayName = 'Content'