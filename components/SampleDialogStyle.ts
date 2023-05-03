import { styleSheet, cssVars, style, rule, atGlobal, vars, descendants, switchOf, children } from '@cssfn/core'
import { typos } from '@reusable-ui/core';

// styles:
export const usesSampleDialogLayout = () => {
    return style({
        display: 'grid',
        gridTemplate: [[
            '"image      name "', 'auto',
            '"image      price"', 'auto',
            '"image      stock"', 'auto',
            '"image visibility"', 'auto',
            '"image fullEditor"', 'auto',
            '/',
            'min-content', 'auto',
        ]],
        padding: '1rem',
        gapInline: '1rem',
        gapBlock: '0.5rem',
        ...descendants(['.name', 'p'], {
            margin: 0,
        }),
        ...descendants('.value', {
            fontWeight: typos.fontWeightSemibold,
        }),
        ...descendants('.edit', {
            marginInlineStart: '0.25em',
            opacity: 0.5,
            transition: [
                ['transform', '300ms', 'ease-out'],
            ],
            ...rule(':hover', {
                opacity: 'unset',
                transform: 'scale(105%)',
            }),
        }),
        ...children('.prodImg', {
            gridArea: 'image',
            alignSelf: 'center',
            width: 'fit-content',
            height: 'fit-content',
            display: 'grid',
            ...children('img', {
                width: '170px',
            }),
            ...children('*', {
                gridArea: '1/1/-1/-1',
            }),
            ...children('.edit', {
                justifySelf: 'start',
                alignSelf: 'start',
                margin: 0,
            }),
        }),
        ...children('.name', {
            gridArea: 'name',
            fontSize: typos.fontSizeXl,
        }),
        ...children('.price', {
            gridArea: 'price',
        }),
        ...children('.stock', {
            gridArea: 'stock',
        }),
        ...children('.visibility', {
            gridArea: 'visibility',
        }),
        ...children('.fullEditor', {
            gridArea: 'fullEditor',
        }),
    });
};

export default () => style({
    // layouts:
    ...usesSampleDialogLayout(),
});
