// cssfn:
import {
    // writes css in javascript:
    rule,
    descendants,
    children,
    style,
    vars,
    scope,
}                           from '@cssfn/core'          // writes css in javascript
import {
    // a border (stroke) management system:
    borders,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // a responsive management system
    ifScreenWidthSmallerThan,
    
    
    
    // a typography management system:
    typos,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
}                           from '@reusable-ui/core'    // a set of reusable-ui packages which are responsible for building any component



export default function scopes() {
    const {paddingVars} = usesPadding();
    
    
    
    return [
        scope('page', {
            display: 'grid',
            boxSizing: 'border-box',
            width: '1280px',
            height: '769px',
            paddingInline: '164px',
            paddingBlock: '28px',
            margin: 'auto',
            borderRadius: 0,
            borderWidth: 0,
            backgroundImage: 'url("/soft-rainbow.svg")',
        }, { specificityWeight: 2 }),
        
        scope('featurePanel', {
            [paddingVars.paddingInline]: '2rem',
            [paddingVars.paddingBlock ]: '1.25rem',
        }, { specificityWeight: 2 }),
        
        scope('demoPanel', {
            display: 'grid',
            blockSize: '400px',
            justifyContent: 'center',
            alignContent: 'center',
        }, { specificityWeight: 2 }),
        
        scope('profile', {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '2rem',
            alignItems: 'center',
            fontSize: '18px',
        }),
        scope('profileImg', {
            borderRadius: '50%',
            border: borders.default,
            width: '125px',
        }),
        scope('featureList', {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            gap: '1rem',
        }),
    ];
}
