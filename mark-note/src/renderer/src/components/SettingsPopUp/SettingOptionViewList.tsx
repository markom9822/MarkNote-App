import { ComponentProps } from 'react'
import { SettingOptionView } from './SettingOptionView' 
import { twMerge } from 'tailwind-merge'
import {isEmpty} from 'lodash'
import { useSettingsList } from '@renderer/hooks/useSettingsList'

export type SettingsOptionsViewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}

export const SettingsOptionsViewList = ({onSelect, className, ...props}: SettingsOptionsViewListProps) => {
    const {options, selectedOptionIndex, handleSettingsSelect, selectedOption} = useSettingsList({onSelect})

    if(!options) return null
    
    return ( 
        <ul className={className} {...props}>
            {options.map((option, index) => (
                <SettingOptionView 
                key={option.title} 
                isActive = {selectedOptionIndex == index}
                onClick={handleSettingsSelect(index)}
                {...option}
            />   
            ))}
        </ul>
        )

}