import { ReactNode } from "react";
import { IconType } from "react-icons";

export type NoteInfo = {
    title: string,
    lastEditTime: number,
}

export type NoteContent = string

export type SettingOptionInfo = {
    title: string,
    icon: IconType,
}
