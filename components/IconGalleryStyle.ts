import { style, imports, rule, children } from '@cssfn/core'

import { spacers, usesBackground, usesForeground } from '@reusable-ui/core';
import { bodyElm, icons } from '@reusable-ui/components'



const usesIconGalleryLayout = () => {
    const {backgroundRule, backgroundVars} = usesBackground();
    const {                foregroundVars} = usesForeground();
    
    
    
    const iconElm  = ':first-child';
    const labelElm = ':nth-child(2)';
    return style({
        ...children(bodyElm, {
            ...children('.item', { // icon entry
                display           : 'flex',
                flexDirection     : 'row',
                justifyContent    : 'start',
                alignItems        : 'center',
                flexWrap          : 'nowrap',
                
                transition        : [
                    ['transform', '100ms', 'ease-out'],
                ],
                ...rule(':hover', {
                    position      : 'relative',
                    zIndex        : 1,
                    transform     : [['scale(1.05)']],
                }),
                
                
                
                ...children(iconElm, {
                    blockSize     : icons.sizeMd,
                    aspectRatio   : '1/1',
                }),
                ...children(labelElm, {
                    paddingInline : spacers.sm,
                    
                    cursor        : 'text',
                    userSelect    : 'text',
                    
                    whiteSpace   : 'nowrap',
                    textOverflow : 'ellipsis',
                    
                    ...children('::selection', {
                        foreg: foregroundVars.foregFn,
                        backg: backgroundVars.backgColorFn,
                    }),
                }),
                
                
                
                ...rule(':not(:hover)', {
                    ...children(labelElm, {
                        overflow     : 'hidden',
                    }),
                }),
                ...rule(':hover', {
                    ...children(labelElm, {
                        ...imports([
                            backgroundRule, // cover the neighbour with solid background
                        ]),
                        ...style({
                            backg    : backgroundVars.backg, // cover the neighbour with solid background
                        }),
                    }),
                }),
            }),
            ...children('button', {
                flexWrap: 'nowrap',
                justifyContent: 'start',
                ...rule(':hover', {
                    position      : 'relative',
                    zIndex        : 1,
                    // transform     : [['scale(1.05)']],
                }),
                
                
                
                ...children('.label', {
                    whiteSpace   : 'nowrap',
                    textOverflow : 'ellipsis',
                }),
                ...rule(':not(:hover)', {
                    ...children('.label', {
                        overflow     : 'hidden',
                    }),
                }),
                ...rule(':hover', {
                    ...children('.label', {
                        ...imports([
                            backgroundRule, // cover the neighbour with solid background
                        ]),
                        ...style({
                            backg    : backgroundVars.backg, // cover the neighbour with solid background
                        }),
                    }),
                }),
            })
        }),
    });
};
export default () => style({
    // layouts:
    ...usesIconGalleryLayout(),
});