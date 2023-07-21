// cssfn:
import {
    // writes css in javascript:
    scope,
}                           from '@cssfn/core'          // writes css in javascript



export default function scopes() {
    return [
        scope('demoPanel', {
            display: 'grid',
            blockSize: '400px',
            justifyContent: 'center',
            alignContent: 'center',
        }, { specificityWeight: 2 }),
        
        scope('demoPanelUpload', {
            alignContent: 'start',
            overflow: 'auto',
        }, { specificityWeight: 2 }),
    ];
}
