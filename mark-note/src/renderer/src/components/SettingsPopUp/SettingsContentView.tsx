import { ComponentProps } from 'react'
import { useSettingsList } from "@renderer/hooks/useSettingsList"
import { ThemesSettingOption } from './Options/ThemesSettingOption'
import { GeneralSettingOption } from './Options/GeneralSettingOption'
import { EditorSettingOption } from './Options/EditorSettingOption'
import { PreviewSettingOption } from './Options/PreviewSettingOption'
import { KeybindingSettingOption } from './Options/KeybindingsSettingOption'
import { it } from 'node:test'

export type SettingsContentProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}


export const SettingsContentView = ({onSelect, className, ...props}: SettingsContentProps) => {
    const {selectedOption, selectedOptionIndex} = useSettingsList({onSelect})

    const items = [
        {
          title: 'General',
          content: (
            <GeneralSettingOption />
          ),
        },
        {
          title: 'Themes',
          content: (
            <ThemesSettingOption />
          ),
        },
        {
          title: 'Editor',
          content: (
            <EditorSettingOption />
          ),
        },
        {
          title: 'Preview',
          content: (
            <PreviewSettingOption />
          ),
        },
        {
          title: 'Keybindings',
          content: (
            <KeybindingSettingOption />
          ),
        }
      ];

    return (
        <ul className={className} {...props}>
            <div>
                {items.map((item, index) => (
                    <div key={item.title + index} className={`${selectedOptionIndex === index ? '' : 'hidden'}`}>
                        {item.content}
                    </div>
                ))}
            </div>
        </ul>
    )
}