'use client'

import { default as React } from 'react'
import { dynamicStyleSheets } from '@cssfn/cssfn-react'

import { ButtonIcon, Generic, Content, CardBody, CardHeader, CardFooter, Button, CloseButton, List, Carousel, Masonry, masonries } from '@reusable-ui/components';
import { useEffect, useRef, useState } from 'react';
import { getCurrencySign } from '@/libs/formatters';
import { AccessibilityProvider, ValidationProvider, useEvent } from '@reusable-ui/core';
import { ModalStatus } from '@/components/ModalStatus'

import { STORE_WEBSITE_URL, PAGE_PRODUCTS_TAB_INFORMATIONS, PAGE_PRODUCTS_TAB_DESCRIPTION, PAGE_PRODUCTS_TAB_IMAGES } from '@/website.config'
import { COMMERCE_CURRENCY_FRACTION_MAX } from '@/commerce.config'
import { TextEditor } from '@/components/editors/TextEditor'
import { PathEditor } from '@/components/editors/PathEditor'
import { CurrencyEditor } from '@/components/editors/CurrencyEditor'
import { ShippingWeightEditor } from '@/components/editors/ShippingWeightEditor'
import { StockEditor } from '@/components/editors/StockEditor'
import { GalleryEditor } from '@/components/editors/GalleryEditor/GalleryEditor'
import { ProductVisibility, VisibilityEditor } from '@/components/editors/VisibilityEditor'
import { Tab, TabPanel } from '@reusable-ui/components'
import { ProductEntry } from '@/models/Product';
import { Image } from '@heymarco/image'
import axios from 'axios'
import { resolveMediaUrl } from '@/libs/mediaStorage.client'
import { WysiwygEditorState, WysiwygEditor, ToolbarPlugin, EditorPlugin } from '@/components/editors/WysiwygEditor';



// styles:
const useFullEditDialogStyleSheet = dynamicStyleSheets(
    () => import(/* webpackPrefetch: true */'./FullEditDialogStyles')
, { id: 'pkeb1tledn' }); // need 3 degrees to overwrite `.cardClass.body`
import './FullEditDialogStyles'



// react components:
export interface FullEditDialogProps {
    // data:
    product                  : ProductEntry
    defaultExpandedTabIndex ?: number
    
    
    
    // handlers:
    onClose                  : () => void
}
export const FullEditDialog = (props: FullEditDialogProps) => {
    // styles:
    const styles = useFullEditDialogStyleSheet();
    
    
    
    // rest props:
    const {
        // data:
        product,
        defaultExpandedTabIndex,
        
        
        
        // handlers:
        onClose,
    } = props;
    
    
    
    // states:
    const [isPathModified  , setIsPathModified  ] = useState<boolean>(false);
    const [isModified      , setIsModified      ] = useState<boolean>(false);
    
    const [enableValidation, setEnableValidation] = useState<boolean>(false);
    const [visibility      , setVisibility      ] = useState<ProductVisibility>(product.visibility as ProductVisibility);
    const [name            , setName            ] = useState<string>(product.name);
    const [path            , setPath            ] = useState<string>(product.path ?? '');
    const [price           , setPrice           ] = useState<number>(product.price);
    const [shippingWeight  , setShippingWeight  ] = useState<number|null>(product.shippingWeight ?? null);
    const [stock           , setStock           ] = useState<number|null>(product.stock          ?? null);
    const [images          , setImages          ] = useState<string[]>(product.images);
    const [description     , setDescription     ] = useState<WysiwygEditorState|null>(() => {
        const description = product.description;
        if (!description) return null;
        if (typeof(description) === 'object') return description as any;
        try {
            return JSON.parse(description);
        }
        catch {
            return null;
        } // try
    });
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    
    
    // refs:
    const firstEditorRef     = useRef<HTMLInputElement|null>(null);
    const editorContainerRef = useRef<HTMLElement|null>(null);
    
    
    
    // dialogs:
    const [errorMessage   , setErrorMessage   ] = useState<React.ReactNode>(undefined);
    const [showWarnUnsaved, setShowWarnUnsaved] = useState<boolean>(false);
    
    
    
    // handlers:
    const handleNameChange = useEvent((name: string) => {
        // conditions:
        if (isPathModified) return; // path is already modified by user, do not perform *auto* modify
        
        
        
        // sync path:
        setPath(
            name.trim().toLowerCase().replace(/(\s|_|-)+/ig, '-')
        );
    })
    const handleSave = useEvent(async () => {
        setEnableValidation(true);
        await new Promise<void>((resolve) => { // wait for a validation state applied
            setTimeout(() => {
                setTimeout(() => {
                    resolve();
                }, 0);
            }, 0);
        });
        if (editorContainerRef.current?.querySelector(':is(.invalidating, .invalidated)')) return;
        
        
        
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            
            product.name           = name;
            product.path           = path;
            product.price          = price;
            product.shippingWeight = shippingWeight ?? undefined;
            product.stock          = stock ?? undefined;
            product.visibility     = visibility;
            product.images         = images;
            
            onClose();
        }
        catch (error: any) {
            const errorStatus = error?.status;
            setErrorMessage(<>
                <p>Oops, an error occured!</p>
                <p>We were unable to save data to the server.</p>
                {(errorStatus >= 400) && (errorStatus <= 499) && <p>
                    There was a <strong>problem contacting our server</strong>.<br />
                    Make sure your internet connection is available.
                </p>}
                {(errorStatus >= 500) && (errorStatus <= 599) && <p>
                    There was a <strong>problem on our server</strong>.<br />
                    The server may be busy or currently under maintenance.
                </p>}
                <p>
                    Please try again in a few minutes.
                </p>
            </>);
        }
        finally {
            setIsLoading(false);
        } // try
    });
    const handleClosing = useEvent(() => {
        if (isModified || isPathModified) {
            setShowWarnUnsaved(true);
        }
        else {
            onClose();
        } // if
    });
    const handleKeyDown : React.KeyboardEventHandler<HTMLElement> = useEvent((event) => {
        switch (event.key) {
            // case 'Enter':
            //     event.preventDefault();
            //     handleSave();
            //     break;
            
            case 'Escape':
                event.preventDefault();
                // handleClosing();
                break;
        } // switch
    });
    
    
    
    // dom effects:
    useEffect(() => {
        // setups:
        const cancelFocus = setTimeout(() => {
            // conditions:
            const firstEditorElm = firstEditorRef.current;
            if (!firstEditorElm) return;
            
            
            
            firstEditorElm.setSelectionRange(0, -1);
            firstEditorElm.focus({ preventScroll: true });
        }, 0);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelFocus);
        }
    }, []);
    
    
    
    // jsx:
    return (
        <>
            <CardHeader
                // handlers:
                onKeyDown={handleKeyDown}
            >
                {name}
                <CloseButton onClick={handleClosing} />
            </CardHeader>
            <ValidationProvider enableValidation={enableValidation}>
                <Tab
                    // variants:
                    mild='inherit'
                    
                    
                    
                    // classes:
                    className={styles.cardBody}
                    
                    
                    
                    // states:
                    enabled={!isLoading}
                    
                    
                    
                    // values:
                    defaultExpandedTabIndex={defaultExpandedTabIndex}
                    
                    
                    
                    // components:
                    listComponent={<List className={styles.tabList} />}
                    bodyComponent={<Content className={styles.tabBody} />}
                    
                    
                    
                    // handlers:
                    onKeyDown={handleKeyDown}
                >
                    <TabPanel label={PAGE_PRODUCTS_TAB_INFORMATIONS} panelComponent={<Generic className={styles.infoTab} />}>
                        <span className='name label'>Name:</span>
                        <TextEditor           className='name editor'       value={name}           onChange={(value) => { setName(value); setIsModified(true); handleNameChange(value); }} />
                        
                        <span className='path label'>Path:</span>
                        <PathEditor           className='path editor'       value={path}           onChange={(value) => { setPath(value); setIsPathModified(true); }} homeUrl={STORE_WEBSITE_URL} />
                        
                        <span className='price label'>Price:</span>
                        <CurrencyEditor       className='price editor'      value={price}          onChange={(value) => { setPrice(value ?? 0); setIsModified(true); }} currencySign={getCurrencySign()} currencyFraction={COMMERCE_CURRENCY_FRACTION_MAX} />
                        
                        <span className='sWeight label'>Shipping Weight:</span>
                        <ShippingWeightEditor className='sWeight editor'    value={shippingWeight} onChange={(value) => { setShippingWeight(value); setIsModified(true); }} />
                        
                        <span className='stock label'>Stock:</span>
                        <StockEditor          className='stock editor'      value={stock}          onChange={(value) => { setStock(value)     ; setIsModified(true); }} theme='primaryAlt' />
                        
                        <span className='visibility label'>Visibility:</span>
                        <VisibilityEditor     className='visibility editor' value={visibility}     onChange={(value) => { setVisibility(value); setIsModified(true); }} theme='primaryAlt' />
                    </TabPanel>
                    <TabPanel label={PAGE_PRODUCTS_TAB_IMAGES}       panelComponent={<Generic className={styles.imagesTab} />}>
                        <GalleryEditor<HTMLElement, string>
                            // values:
                            value={images}
                            onChange={(value) => {
                                setImages(value);
                                setIsModified(true);
                            }}
                            
                            
                            
                            // actions:
                            onActionDelete={async (imageData) => {
                                await axios.delete(`/api/upload?imageId=${encodeURIComponent(imageData)}`);
                                return true;
                            }}
                            
                            
                            
                            // upload/uploading activities:
                            onUploadImageStart={async (imageFile, reportProgress, cancelController) => {
                                const formData = new FormData();
                                formData.append('image' , imageFile);
                                formData.append('folder', name);
                                const response = await axios.post('/api/upload', formData, {
                                    headers          : { 'content-type': 'multipart/form-data' },
                                    onUploadProgress : (event) => {
                                        reportProgress(
                                            (event.loaded * 100) / (event.total ?? 100)
                                        );
                                    },
                                });
                                return response.data.id;
                            }}
                            
                            
                            
                            // components:
                            imageComponent={
                                // @ts-ignore
                                <Image
                                    priority={true}
                                />
                            }
                            
                            
                            
                            // handlers:
                            onResolveUrl={resolveMediaUrl<never>}
                        />
                    </TabPanel>
                    <TabPanel label={PAGE_PRODUCTS_TAB_DESCRIPTION}  panelComponent={<Generic className={styles.descriptionTab} />}>
                        <WysiwygEditor
                            // classes:
                            className={styles.editDescription}
                            
                            
                            
                            // values:
                            value={description}
                            onChange={(value) => {
                                setDescription(value);
                                setIsModified(true);
                            }}
                        >
                            <ToolbarPlugin className='solid' theme='primary' />
                            <EditorPlugin
                                // accessibilities:
                                placeholder='Type product description here...'
                            />
                        </WysiwygEditor>
                    </TabPanel>
                </Tab>
            </ValidationProvider>
            <CardFooter onKeyDown={handleKeyDown}>
                <ButtonIcon className='btnSave' icon={isLoading ? 'busy' : 'save'} theme='success' onClick={handleSave}>Save</ButtonIcon>
                <ButtonIcon className='btnCancel' icon='cancel' theme='danger' onClick={handleClosing}>Cancel</ButtonIcon>
            </CardFooter>
            <ModalStatus
                theme='danger'
                backdropStyle='static'
            >
                {!!errorMessage && <>
                    <CardHeader>
                        Error Saving Data
                        <CloseButton onClick={() => setErrorMessage(undefined)} />
                    </CardHeader>
                    <CardBody>
                        {errorMessage}
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => setErrorMessage(undefined)}>
                            Okay
                        </Button>
                    </CardFooter>
                </>}
            </ModalStatus>
            <ModalStatus
                theme='warning'
                backdropStyle='static'
            >
                {showWarnUnsaved && <>
                    <CardHeader>
                        Unsaved Data
                    </CardHeader>
                    <CardBody>
                        <p>
                            Do you want to save the changes?
                        </p>
                    </CardBody>
                    <CardFooter>
                        <ButtonIcon theme='success' icon='save' onClick={() => {
                            // close the dialog first:
                            setShowWarnUnsaved(false);
                            // then do a save (it will automatically close the editor after successfully saving):
                            handleSave();
                        }}>
                            Save
                        </ButtonIcon>
                        <ButtonIcon theme='danger' icon='cancel' onClick={() => {
                            // close the dialog first:
                            setShowWarnUnsaved(false);
                            // then close the editor (without saving):
                            onClose();
                        }}>
                            Don&apos;t Save
                        </ButtonIcon>
                        <ButtonIcon theme='secondary' icon='edit' onClick={() => {
                            // close the dialog:
                            setShowWarnUnsaved(false);
                        }}>
                            Continue Editing
                        </ButtonIcon>
                    </CardFooter>
                </>}
            </ModalStatus>
        </>
    );
}
