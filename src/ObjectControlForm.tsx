import React, {FormEvent} from "react";
import ObjectControl, {ObjectControlProps} from "./ObjectControl";

export interface ObjectControlFormProps<T extends object> extends ObjectControlProps<T> {
    onSubmit?: (v: T) => void,
    submitText?: string,
    formClassName?: string,
}


/**
 * Component for editing and viewing js objects with submit
 * Example:
 * ```
 * <ObjectControlForm value={{name: "Alex"}} config={{name: {label: "Name"}}} onSubmit={v => console.log(v)}/>
 * ```
 */
function ObjectControlForm<T extends object>(props: ObjectControlFormProps<T>) {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (props.value) props.onSubmit?.(props.value)
    }

    return <form className={"roc form " + props.formClassName ?? ""} onSubmit={onSubmit}>
        <ObjectControl {...props}/>
        <button className={"roc submit"}>{props.submitText ?? "Submit"}</button>
    </form>
}

export default ObjectControlForm;
