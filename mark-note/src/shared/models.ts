import { ReactNode } from "react";
import { IconType } from "react-icons";

export type NoteInfo = {
    title: string,
    lastEditTime: number,
    status: string
}

export type NoteContent = string

export type NoteStatus = string

export type SettingOptionInfo = {
    title: string,
    icon: IconType,
}
