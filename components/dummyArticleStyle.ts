// cssfn:
import {
    // writes css in javascript:
    children,
    style,
    vars,
    scopeOf,
    descendants,
    rule,
}                           from '@cssfn/core'          // writes css in javascript



const dummyPageLayout = () => style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
})
const dummyArticleLayout = () => style({
    border: 'solid 1px black',
    background : 'hsl(200, 90%, 75%)',
    
    
    ...children(['&', 'section:nth-of-type(4)'], {
        display       : 'flex',
        flexDirection : 'column',
        gap           : 0,
        overflowY     : 'auto',
        
        padding       : '10px',
        
        ...children('section', {
            flex      : [[0, 0, 'auto']],
            padding   : '10px',
        }),
    }),
    height            : '250px',
    ...children('section:nth-of-type(4)', {
        height        : '200px',
    }),
    
    
    ...children('section', {
        ...rule(':nth-of-type(3n+1)', {
            background : 'hsl(350, 90%, 75%)',
        }),
        ...rule(':nth-of-type(3n+2)', {
            background : 'hsl(120, 90%, 75%)',
        }),
        ...rule(':nth-of-type(3n+3)', {
            background : 'hsl(39, 90%, 75%)',
        }),
        ...rule(':nth-of-type(4)', {
            ...children('section', {
                ...rule(':nth-of-type(3n+1)', {
                    background : 'hsl(084, 90%, 75%)',
                }),
                ...rule(':nth-of-type(3n+2)', {
                    background : 'hsl(260, 90%, 75%)',
                }),
                ...rule(':nth-of-type(3n+3)', {
                    background : 'hsl(028, 90%, 75%)',
                }),
            }),
        }),
    }),
    
    
    ...descendants('section', {
        overflow: 'hidden',
    }),
    ...descendants(['h1', 'h2'], {
        textAlign: 'center',
    }),
    ...descendants('h1', {
        fontSize: '1.25rem',
    }),
    ...descendants('h2', {
        fontSize: '1rem',
    }),
    ...descendants('p', {
        fontSize: '0.5rem',
        textOverflow: 'ellipsis'
    }),
    
    
    ...children('section:nth-of-type(1)', {
        height : '80px',
    }),
    ...children('section:nth-of-type(2)', {
        height : '200px',
    }),
    ...children('section:nth-of-type(3)', {
        height : '400px',
    }),
    ...children('section:nth-of-type(4)', {
        ...children('section:nth-of-type(1)', {
            height: '200px',
        }),
        ...children('section:nth-of-type(2)', {
            height: '100px',
        }),
        ...children('section:nth-of-type(3)', {
            height: '150px',
        }),
        ...children('section:nth-of-type(4)', {
            height: '100px',
        }),
    }),
    ...children('section:nth-of-type(5)', {
        height : '300px',
    }),
    ...children('section:nth-of-type(6)', {
        height : '100px',
    }),
});

export default () => [
    scopeOf('dummyPage', {
        ...dummyPageLayout(),
    }),
    scopeOf('dummyArticle', {
        ...dummyArticleLayout(),
    }),
];

