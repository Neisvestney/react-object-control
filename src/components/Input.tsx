import React, {ChangeEvent} from "react";
import {ConfigItem, ObjectControlState} from "../defaultConfigs";

export interface InputProps<T>{
    state: ObjectControlState
    v: T[keyof T],
    config: ConfigItem<T>,
    k: string,
    onChange: (v: T[keyof T]) => void
    inputType: React.HTMLInputTypeAttribute
}

function Input<T>(props: InputProps<T>) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (props.inputType) {
            case "string": props.onChange(e.target.value as any)
                break
            case "number": props.onChange(parseInt(e.target.value) as any)
                break
        }
    }

    return <input
        className={"roc input"}
        disabled={props.state != ObjectControlState.Active}
        value={props.v as any ?? ""}
        type={props.inputType}
        placeholder={props.config.placeHolder}
        key={props.k}
        onChange={onChange}/>
}

export default Input;
