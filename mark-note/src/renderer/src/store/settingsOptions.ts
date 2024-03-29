import { NoteInfo, NoteContent, SettingOptionInfo } from "@shared/models";
import { atom } from "jotai";
import {unwrap} from 'jotai/utils'
import { LuPaintbrush } from "react-icons/lu";
import { FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { ThemesSettingOption} from '@/components/SettingsPopUp/Options/ThemesSettingOption'

 
const settingsOptions = [{
    id: 0,
    title: 'General',
    icon: FaChalkboardTeacher,
  }, {
    id: 1,
    title: 'Themes',
    icon: LuPaintbrush,
  }, {
    id: 2,
    title: 'Editing',
    icon: FaLaptopCode,
  }];


const loadSettingsOptions = async () => {
    const options = Promise.all(settingsOptions)

    return options;
}

// settings
const settingOptionsAtomAsync = atom<SettingOptionInfo[] | Promise<SettingOptionInfo[]>>(loadSettingsOptions)

export const settingOptionsAtom = unwrap(settingOptionsAtomAsync, (prev) => prev)

export const selectedSettingOptionIndexAtom = atom<number | null>(null)

const selectedSettingAtomAsync = atom(async (get) => {
    const options = get(settingOptionsAtom)
    const selectedOptionIndex = get(selectedSettingOptionIndexAtom)

    if (selectedOptionIndex == null || !options) return null

    const selectedOption = options[selectedOptionIndex]

    return {
        ...selectedOption,
    }
})

export const selectedSettingAtom = unwrap(selectedSettingAtomAsync, (prev) => prev ?? {
    title: '',
    icon: MdOutlineDisabledByDefault,
    content: ThemesSettingOption
})