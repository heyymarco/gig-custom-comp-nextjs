import { useRef } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { Styles } from '@cssfn/cssfn-react'



export const StylesSSR = () => {
    const isStyleInjected = useRef<boolean>(false); // workaround for <React.StrictMode>
    useServerInsertedHTML(() => {
        // conditions:
        if (isStyleInjected.current) return null;
        isStyleInjected.current = true;
        
        
        
        // actions:
        return <Styles key='123abc' />
    });
    return <></>;
}
