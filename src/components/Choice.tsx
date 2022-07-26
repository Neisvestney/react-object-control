import React, {ChangeEvent} from "react";
import {ConfigItem, ObjectControlState} from "../defaultConfigs";

export interface ChoiceProps<T>{
    state?: ObjectControlState
    v: T[keyof T],
    config: ConfigItem<T>,
    k: string,
    view?: boolean
    onChange?: (v: T[keyof T]) => void
}

function Choice<T>(props: ChoiceProps<T>) {
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (props.config.type) {
            case "string": props.onChange?.(e.target.value as any)
                break
            case "number": props.onChange?.(parseInt(e.target.value) as any)
                break
        }
    }

    let choices: {k: T[keyof T], v: any}[] = []
    if (Array.isArray(props.config.choices)) {
        // choices.push(...props.config.choices.map(c => ({k: c, v: c})))

        for (let c of props.config.choices) {
            if (Array.isArray(c)) {
                choices.push({k: c[0], v: c[1]})
            } else {
                choices.push({k: c, v: c})
            }
        }
    }

    if (props.view) {
        return <p>
            {choices.find(c => c.k == props.v)?.v ?? props.v}
        </p>
    } else {
        return <select
            className={"roc input"}
            disabled={props.state != ObjectControlState.Active}
            value={props.v as any ?? ""}
            placeholder={props.config.placeHolder}
            key={props.k}
            onChange={onChange}>
            {choices.map(c =>
                <option key={c.k as any} value={c.k as any}>{c.v}</option>
            )}
        </select>
    }
}

export default Choice;
