import React, {useEffect, useState} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import ObjectControl from "../ObjectControl";
import {config, value} from "./shared";

export default {
    title: 'ObjectControl',
    component: ObjectControl,
    argTypes: {
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
        }
    },
} as ComponentMeta<typeof ObjectControl>;

export const Default: ComponentStory<typeof ObjectControl> = (props) => {
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChange = (v: object) => {
        setValue(v)
        props.onChange?.(v)
    }

    return <ObjectControl {...props} value={value} onChange={onChange}/>;
}
