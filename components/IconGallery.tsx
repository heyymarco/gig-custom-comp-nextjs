import React from 'react'

import { dynamicStyleSheet } from '@cssfn/cssfn-react'

import { useMergeClasses } from '@reusable-ui/core';
import { Icon } from '@reusable-ui/components'
import iconFonts from '@reusable-ui/icon/dist/icon-font-material'

import { Gallery, GalleryProps, ItemProps } from '@/components/Gallery';



export const useGalleryStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */'./IconGalleryStyle')
, { specificityWeight: 3, id: 'f9m0wwbe9x' }); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



const iconSets = [
    'instagram',
    'whatsapp',
    'close',
    // 'busy',
    'prev',
    'next',
    'dropup',
    'dropdown',
    'dropright',
    'dropleft',
    ...iconFonts.filter((icon) => !icon.match(/^[0-9]/)),
];



export interface IconGalleryProps extends Omit<GalleryProps, 'collection'|'children'> {
    itemComponent ?: (itemName: string, itemProps: ItemProps) => React.ReactElement
}
const IconGallery = (props: IconGalleryProps) => {
    const styleSheet = useGalleryStyleSheet();
    
    
    
    const {
        itemComponent = (itemName) => (
            <span className='item'>
                <Icon
                    // {...itemProps}
                    icon={itemName}
                    size='md'
                />
                <span>
                    {itemName}
                </span>
            </span>
        ),
    ...restGalleryProps} = props;
    
    
    
    const classes = useMergeClasses(
        props.classes,
        styleSheet.main,
    );
    
    
    
    return (
        <Gallery
            {...restGalleryProps}
            
            collection={iconSets}
            classes={classes}
        >
            {itemComponent}
        </Gallery>
    );
}
export {
    IconGallery,
    IconGallery as default,
}
