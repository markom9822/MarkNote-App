import { SettingPrefsInfo } from "@shared/models";
import { atom } from "jotai";
import {unwrap} from 'jotai/utils'

export const settingsPrefsDefaults = [{
    section: 'Editor',
    pref: 'Line Numbers Visible',
    value: true,
  },
  {
    section: 'Editor',
    pref: 'Toolbar Visible',
    value: true,
  },
];



