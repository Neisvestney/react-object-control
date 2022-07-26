import React, {ReactElement} from "react";
import Input from "./components/Input";
import Choice from "./components/Choice";

export const typeStrings = ["string", "number", "custom"] as const;
export type Type = typeof typeStrings[number] | undefined;

export enum ObjectControlState {
    Active,
    Disabled,
    Loading
}

export type ConfigItem<T> = {
    label?: string,
    placeHolder?: string,
    undefinable?: boolean,
    choices?: T[keyof T][] | [T[keyof T], string][],
    type?: Type,
    control?: (value: T[keyof T], key: string, onChange: (v: T[keyof T]) => void, state: ObjectControlState, config: ConfigItem<T>) => ReactElement,
    view?: (value: T[keyof T], key: string, config: ConfigItem<T>) => ReactElement
}


export function defaultConfig<T>(t: Type): ConfigItem<T> {
    const configs: ConfigItem<T>[] = [
        {
            type: "string",
            control: (v, key, onChange, state, config) => !config.choices
                ? <Input v={v} k={key} key={key} onChange={onChange} state={state} config={config} inputType={"string"}/>
                : <Choice v={v} k={key} key={key} onChange={onChange} state={state} config={config}/>,
            view: (v, key, config) => !config.choices
                ? <p key={key}>{v as any}</p>
                : <Choice v={v} config={config} k={key} key={key} view/>
        },
        {
            type: "number",
            control: (v, key, onChange, state, config) => !config.choices
                ? <Input v={v} k={key} key={key} onChange={onChange} state={state} config={config} inputType={"number"}/>
                : <Choice v={v} k={key} key={key} onChange={onChange} state={state} config={config}/>,
            view: (v, key, config) => !config.choices
                ? <p key={key}>{v as any}</p>
                : <Choice v={v} config={config} k={key} key={key} view/>
        }
    ]

    return configs.find(v => v.type == t) ?? {}
}
