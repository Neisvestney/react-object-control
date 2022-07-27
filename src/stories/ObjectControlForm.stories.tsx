import React, {useEffect, useState} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {config, value} from "./shared";
import ObjectControlForm from "../ObjectControlForm";

export default {
    title: 'ObjectControlForm',
    component: ObjectControlForm,
    argTypes: {
        submitText: {
            type: 'string',
            defaultValue: "Submit"
        },
        value: {
            defaultValue: value,
        },
        config: {
            defaultValue: config,
        },
        isEditing: {
            type: 'boolean',
            defaultValue: true
        },
        className: {
            type: 'string',
            defaultValue: ""
        },
        formClassName: {
            type: 'string',
            defaultValue: ""
        }
    },
} as ComponentMeta<typeof ObjectControlForm>;

export const Default: ComponentStory<typeof ObjectControlForm> = (props) => {
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChange = (v: object) => {
        setValue(v)
        props.onChange?.(v)
    }

    return <ObjectControlForm {...props} value={value} onChange={onChange}/>;
}
