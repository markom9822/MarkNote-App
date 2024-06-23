import { NoteInfo, NoteContent, SettingOptionInfo, SettingPrefsInfo } from "@shared/models";
import { atom } from "jotai";
import {unwrap} from 'jotai/utils'
import { LuPaintbrush } from "react-icons/lu";
import { FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { RxKeyboard } from "react-icons/rx";
import { ThemesSettingOption} from '@/components/SettingsPopUp/Options/ThemesSettingOption'
import { read } from "fs";

 
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
    title: 'Editor',
    icon: FaLaptopCode,
  },
  {
    id: 3,
    title: 'Preview',
    icon: MdOutlinePreview,
  },
  {
    id: 4,
    title: 'Keybindings',
    icon: RxKeyboard,
  }
];


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

const loadSettingPref = async () => {
  const allPrefs = await window.context.getAllPrefs()
  console.info(allPrefs)

  return allPrefs
}

const allPrefsAtomAsync = atom<SettingPrefsInfo[] | Promise<SettingPrefsInfo[]>>(loadSettingPref())

export const allPrefsAtom = unwrap(allPrefsAtomAsync, (prev) => prev)

export const setSettingPrefAtom = atom(null, async (get, set, prefTitle: string, newPref: string) => {

  const allPrefs = get(allPrefsAtom)

  if(!allPrefs) return

  // save on disk
  await window.context.setSettingPref(prefTitle, newPref)

  set(
    allPrefsAtom,
    allPrefs.map((pref) => {
        // this is the pref that we want to update
        if(pref.title == prefTitle) {
            return {
                ...pref,
                prefValue: newPref
            }
        }
        return pref
    })
  )

})