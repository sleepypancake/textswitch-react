import { ChangeEvent, HTMLAttributes } from "react"

export interface TextSwitchProps extends HTMLAttributes<HTMLButtonElement> {
    label1?: string
    label2?: string,
    key1?: string,
    key2?: string,
    initialState?: boolean
}

export type ChangeSwitcherType =(value: string) => (e: ChangeEvent<HTMLInputElement>) => void;

export type SwitcherContextType = {currentCheked: string, onChangeSwitcher: ChangeSwitcherType}

export type TextSwitchHandle = {
    value: string,
    onChange: ChangeSwitcherType,
    key: string
};