import React from 'react'

import { OrientationName } from '@reusable-ui/core';
import { Group, GroupProps, useResponsiveCurrentFallback } from '@reusable-ui/components'



export interface ResponsiveGroupProps extends GroupProps {
}
const ResponsiveGroup = (props: ResponsiveGroupProps) => {
    const responsiveOrientation = useResponsiveCurrentFallback<OrientationName|undefined>();
    
    return (
        <Group
            {...props}
            
            orientation={props.orientation ?? responsiveOrientation ?? 'inline'}
        />
    );
}
export {
    ResponsiveGroup,
    ResponsiveGroup as default,
}
