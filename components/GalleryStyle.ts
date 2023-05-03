import { style, rule, children } from '@cssfn/core'
import { spacers } from '@reusable-ui/core'
import { headerElm, footerElm, bodyElm } from '@reusable-ui/components';



const usesGalleryLayout = () => style({
    ...children([headerElm, footerElm], {
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        
        gap           : spacers.default,
        
        filter        : [[
            'contrast(80%)',
        ]],
        
        ...children('.panel', {
            display       : 'flex',
            flexDirection : 'column',
            alignItems    : 'center',
            maxInlineSize : '100%', // wraps long <Pagination>
            
            alignSelf     : 'stretch',
            
            ...children('.flow', {
                display        : 'flex',
                flexWrap       : 'wrap',
                justifyContent : 'center',
                ...rule('.block', {
                    flexDirection : 'column',
                }),
                ...rule('.inline', {
                    flexDirection : 'row',
                }),
                gap       : spacers.default,
            }),
        }),
    }),
    ...children(bodyElm, {
        display               : 'grid',
        gridAutoFlow          : 'row',
        gridTemplateColumns   : 'repeat(auto-fill, minmax(100px, 1fr))',
        gridAutoRows          : 'max-content',
        
        justifyItems          : 'stretch', // give each item maximum allowed width
        justifyContent        : 'center',  // if the items are too few, center whole items horizontally
        
        overflow              : 'hidden',
        
        gap                   : spacers.lg,
    }),
});
export default () => style({
    // layouts:
    ...usesGalleryLayout(),
});