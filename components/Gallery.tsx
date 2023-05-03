import React, { useDeferredValue, useRef, useState } from 'react'

import { dynamicStyleSheet } from '@cssfn/cssfn-react'

import { OrientationName, ThemeName, useMergeClasses } from '@reusable-ui/core'
import { Generic, Card, Icon, ButtonIcon, Search, Label, NavItem, NavNextItem, NavPrevItem, Pagination, Group, ResponsiveProvider, CardProps, CardHeader, CardFooter, CardBody } from '@reusable-ui/components';

import SelectTheme from '@/components/SelectTheme';



export const useGalleryStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */'./GalleryStyle')
, { specificityWeight: 2, id: 'djdmelzjgf' }); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export interface ItemProps {
    theme ?: ThemeName,
}
export interface GalleryProps extends Omit<CardProps, 'children'> {
    collection : string[]
    children   : (itemName: string, itemProps: ItemProps) => React.ReactElement
}
const Gallery = (props: GalleryProps) => {
    const styleSheet = useGalleryStyleSheet();
    
    
    
    const {
        collection,
        children: itemMap,
    ...restCardProps} = props;
    
    
    
    const [theme , setTheme ] = useState<ThemeName|undefined>('primary');
    const delayedTheme = useDeferredValue(theme);
    const [search, setSearch] = useState<string>('');
    const searchRef           = useRef<HTMLInputElement>(null);
    
    
    
    const hasSearch = !!search && !!search.trim();
    const filteredCollection = hasSearch ? (() => {
        const filter = search.trim().toLowerCase();
        return collection.filter((item) => item.toLowerCase().includes(filter));
    })() : collection;
    const delayedFilteredCollection = useDeferredValue(filteredCollection);
    
    const itemsPerPage = 20;
    const [pageIndex, setPageIndex] = useState<number>(0);
    const totalPages = Math.ceil(filteredCollection.length / itemsPerPage);
    if (totalPages && (pageIndex > (totalPages - 1))) setPageIndex(0); // reset if out-of-range, in case of the collection is shrinking due to seach filter changed
    const delayedTotalPages = useDeferredValue(totalPages);
    
    
    
    const classes = useMergeClasses(
        props.classes,
        'media',
        styleSheet.main,
    );
    
    
    
    const pageOptions = (
            <div className='panel'>
                <Generic className={`flow inline`}>
                    <Group orientation='inline' size='sm'>
                        <Label className='solid'>
                            <Icon icon='color_lens' />
                        </Label>
                        <SelectTheme className='fluid' orientation='inline' label='' showName={false} size='sm' value={theme} setValue={setTheme} />
                    </Group>
                    <Group orientation='inline' size='sm'>
                        {
                            hasSearch
                            ?
                            /* reset button: */
                            <ButtonIcon className='solid' theme='secondary' mild={true} icon='clear' onClick={() => {
                                setSearch('');              // clear the search box
                                searchRef.current?.focus(); // focus the search box
                            }} />
                            :
                            /* static label: */
                            <Label className='solid'>
                                <Icon icon='search' />
                            </Label>
                        }
                        <Search className='fluid' elmRef={searchRef} placeholder='search' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
                    </Group>
                </Generic>
            </div>
    );
    const pageNav = (
        <div className='panel'>
            <Pagination
                size='sm'
                
                itemsLimit={10}
                prevItems={
                    <NavPrevItem
                        onClick={() => setPageIndex(0)}
                    />
                }
                nextItems={
                    <NavNextItem
                        onClick={() => setPageIndex(delayedTotalPages - 1)}
                    />
                }
            >
                {
                    [...Array(delayedTotalPages)]
                    .map((_value, counter) => counter)
                    .map((counter) => (
                        <NavItem
                            key={counter}
                            
                            active={counter === pageIndex}
                            onClick={() => setPageIndex(counter)}
                        >
                            {counter + 1}
                        </NavItem>
                    ))
                }
            </Pagination>
        </div>
    );
    return (
        <Card
            {...restCardProps}
            
            classes={classes}
            theme={delayedTheme}
            size='sm'
        >
            <CardHeader>
                {pageOptions}
                {pageNav}
            </CardHeader>
            <CardBody>
                {
                    delayedFilteredCollection
                    .slice((pageIndex * itemsPerPage), (pageIndex * itemsPerPage) + itemsPerPage)
                    .map((itemName) =>
                        React.cloneElement(itemMap(itemName, { theme: delayedTheme }),
                            // props:
                            {
                                key: itemName,
                            },
                        )
                    )
                }
            </CardBody>
            <CardFooter>
                {pageNav}
            </CardFooter>
        </Card>
    );
}
export {
    Gallery,
    Gallery as default,
}
