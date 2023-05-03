import React from 'react'

import { Label, Radio, RadioProps } from '@reusable-ui/components';

import { ResponsiveGroup, ResponsiveGroupProps } from '@/components/ResponsiveGroup';



export interface SelectProps<TValue = any> extends ResponsiveGroupProps {
    label    ?: string
    
    value    ?: TValue
    setValue ?: React.Dispatch<TValue>
    
    options   : TValue[]
    getName  ?: (value: TValue) => string|null,
    getProps ?: (value: TValue) => RadioProps
}
const Select = <TValue extends any = any>(props: SelectProps<TValue>) => {
    const {
        label,
        
        value,
        setValue,
        
        options,
        getName,
        getProps,
    ...restResponsiveGroupProps} = props;
    
    return (
        <ResponsiveGroup
            {...restResponsiveGroupProps}
            
            theme={props.theme ?? 'primary'}
        >
            {(label || undefined) && <Label>{label}</Label>}
            {options.map((option, index) =>
                <Radio
                    key={index}
                    
                    theme={undefined}
                    mild={true}
                    nude={false}
                    
                    name={label}
                    
                    active={Object.is(value, option)}
                    onActiveChange={(event) => {
                        if (event.active) setValue?.(option);
                    }}
                    
                    {...getProps?.(option)}
                >
                    {getName ? getName(option) : ((option === undefined) ? 'unset' : `${option}`)}
                </Radio>
            )}
        </ResponsiveGroup>
    );
}
export {
    Select,
    Select as default,
}
