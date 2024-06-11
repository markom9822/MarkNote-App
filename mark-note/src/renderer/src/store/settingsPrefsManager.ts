import { SettingPrefsInfo } from "@shared/models";
import { atom } from "jotai";
import {unwrap} from 'jotai/utils'

const settingsPrefsDefaults = [{
    id: 0,
    section: 'Editor',
    pref: 'Line Numbers Visible',
    value: true,
  },
  {
    id: 1,
    section: 'Editor',
    pref: 'Toolbar Visible',
    value: true,
  },
];

const loadSettingsPrefs = async () => {
    const options = Promise.all(settingsPrefsDefaults)
    return options;
}

// settings
const settingPrefsAtomAsync = atom<SettingPrefsInfo[] | Promise<SettingPrefsInfo[]>>(loadSettingsPrefs)

export const settingOptionsAtom = unwrap(settingPrefsAtomAsync, (prev) => prev)


