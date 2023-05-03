import { styleSheet, cssVars, style, rule, atGlobal, vars, descendants, switchOf } from '@cssfn/core'
import { basics, iconConfig } from '@reusable-ui/components'
import { codes, colors, leads, typos, usesMildable, usesOutlineable } from '@reusable-ui/core'
import { codeValues, colorValues, defineTheme } from '@reusable-ui/core'



defineTheme('primaryAlt', 'hsl(216, 100%, 85%)');
(colorValues as any).primaryAltMild = 'hsl(216, 100%, 87%)' as any;

codeValues.fontSize = '1em';


leads.fontWeight = typos.fontWeightNormal;



interface CodeVars {
    foregFn    : any
    altForegFn : any
    foreg      : any
}
const [codeVars] = cssVars<CodeVars>();

const codeStyle = () => {
    const { outlineableVars } = usesOutlineable();
    const { mildableVars } = usesMildable();
    
    return style({
        ...rule('a:has(>code:only-child)', {
            textDecoration: [['none'], '!important'], // disable underline for <a> wrapping single <code>
        }),
        ...rule(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.h1', '.h2', '.h3', '.h4', '.h5', '.h6'], {
            ...descendants('code', {
                fontSize: [['inherit'], '!important'],
            }),
        }),
        ...rule('code', {
            ...vars({
                [codeVars.foregFn   ] : [[
                    switchOf(outlineableVars.outlinedSw, mildableVars.mildSw), // the (outlined|mild) switching function
                    codes.foreg,
                ]],
                [codeVars.altForegFn] : colors.dangerMild,
                [codeVars.foreg     ] : switchOf(
                    codeVars.foregFn,
                    codeVars.altForegFn,
                ),
            }),
            color      : codeVars.foreg,
            transition : basics.transition,
        }, { specificityWeight: 2 }),
    });
};

styleSheet(() => style({
    ...atGlobal({
        ...codeStyle(),
    }),
}), { id: 'site-css' });



iconConfig.image.files.push(
    { name: 'fiverr.svg', ratio: '1/1'}
);
