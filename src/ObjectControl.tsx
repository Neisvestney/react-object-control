import React, {HTMLProps} from "react";
import {ConfigItem, defaultConfig, ObjectControlState, Type, typeStrings} from "./defaultConfigs";

export type FieldsConfig<T> = {
    [key in keyof T]?: ConfigItem<T>;
};

export interface ObjectControlProps<T extends object> {
    value: T | undefined | null,
    onChange?: (v: T) => void,
    config?: FieldsConfig<T>,
    isEditing?: boolean,
    state?: ObjectControlState,
    className?: string,
}

/**
 * Component for editing and viewing js objects
 * Example:
 * ```jsx
 * <ObjectControl value={{name: "Alex"}} config={{name: {label: "Name"}}}/>
 * ```
 */
function ObjectControl<T extends object>(props: ObjectControlProps<T>) {
    const onChange = (v: T[keyof T], key: keyof T) => {
        if (props.onChange) {
            if (props.value) props.onChange({...props.value, [key]: v})
        }
    }

    const fields = []
    if (props.value) {
        for (const key of Object.keys(props.value)) {
            let value = props.value[key as keyof T]
            const isEditing = props.isEditing ?? true
            let config: ConfigItem<T> = props.config?.[key as keyof T] ?? {}

            if (typeStrings.includes(typeof value as any) && !config.type) config.type = typeof value as Type

            config = {...defaultConfig<T>(config.type), ...config}

            const control = config?.control?.(value, key, (v) => onChange(v, key as keyof T), props.state ?? ObjectControlState.Active, config)
            const view = config?.view?.(value, key, config)

            if (isEditing ? control : view) {
                fields.push({
                    key,
                    value,
                    element: isEditing ? control : view,
                    config
                });
            }
        }
    }

    return <div className={"roc fields " + props.className ?? ""}>
        {fields.map(f => <div className={"roc field"} key={f.key}>
            <label key={f.key + "label"} className={"roc label"}>{f.config.label}</label>
            {f.element}
        </div>)}
    </div>
}

export default ObjectControl;
