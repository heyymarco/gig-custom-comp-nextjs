import {
    useRef,
    useState,
} from 'react';
import { EditButton } from '@/components/EditButton'
import { FullEditDialog } from '@/components/FullEditDialog'
import { ProductEntry } from '@/models/Product';
import { formatCurrency, getCurrencySign } from '@/libs/formatters';
import ModalStatus from '@/components/ModalStatus';
import { useEvent } from '@reusable-ui/core';
import { dynamicStyleSheet } from '@cssfn/cssfn-react';
import { SimpleEditDialog } from '@/components/SimpleEditDialog';
import { COMMERCE_CURRENCY_FRACTION_MAX } from '@/commerce.config';
import CurrencyEditor from '@/components/editors/CurrencyEditor';
import StockEditor from '@/components/editors/StockEditor';
import TextEditor from '@/components/editors/TextEditor';
import VisibilityEditor from '@/components/editors/VisibilityEditor';
import { Image } from '@heymarco/image'
import { resolveMediaUrl } from '@/libs/mediaStorage.client';



// styles:
const useSampleDialogStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */'./SampleDialogStyle')
, { id: 'khg&fki97', specificityWeight: 2 });




export const SampleDialog = () => {
    const styles = useSampleDialogStyleSheet();
    
    
    
    // states:
    type EditMode = Exclude<keyof ProductEntry, '_id'|'image'>|'full'
    const [editMode, setEditMode] = useState<EditMode|null>(null);
    
    
    
    const [product, setProduct] = useState<ProductEntry>(() => ({
        _id: '#123',
        
        visibility: 'published',
        
        name : 'Nokia 3310',
        
        price : 123,
        shippingWeight: 0.30,
        
        stock: 8,
        
        description: null,
        images: [
            'nokia-3310/nokia-3310_0.jpg',
            'nokia-3310/nokia-3310_1.jpg',
            'nokia-3310/nokia-3310_2.jpg',
            'nokia-3310/nokia-3310_3.jpg',
        ],
        path: 'nokia-3310'
    }));
    const {
        name,
        images,
        price,
        stock,
        visibility,
        path,
    } = product;
    
    
    
    // refs:
    const listItemRef = useRef<HTMLDivElement|null>(null);
    
    
    
    // handlers:
    const handleEditDialogClose = useEvent((): void => {
        setEditMode(null);
    });
    
    
    
    return (
        <div>
            <div className={styles.main} ref={listItemRef}>
                <div className='prodImg'>
                    <Image
                        className='image'
                        alt={name ?? ''}
                        src={resolveMediaUrl(images?.[0])}
                        sizes='170w'
                    />
                    <EditButton onClick={() => setEditMode('full')} />
                </div>
                
                <h3 className='name'>
                    {name}
                    <EditButton onClick={() => setEditMode('name')} />
                </h3>
                <p className='price'>
                    <strong className='value'>{formatCurrency(price)}</strong>
                    <EditButton onClick={() => setEditMode('price')} />
                </p>
                <p className='stock'>
                    Stock: <strong className='value'>{stock ?? 'unlimited'}</strong>
                    <EditButton onClick={() => setEditMode('stock')} />
                </p>
                <p className='visibility'>
                    Visibility: <strong className='value'>{visibility}</strong>
                    <EditButton onClick={() => setEditMode('visibility')} />
                </p>
                <p className='fullEditor'>
                    <EditButton buttonStyle='regular' onClick={() => setEditMode('full')}>
                        Open full editor
                    </EditButton>
                </p>
            </div>
            <ModalStatus theme='primary' viewport={listItemRef} backdropStyle='static' onExpandedChange={({expanded}) => {
                if (!expanded) {
                    setEditMode(null);
                    setProduct({...product});
                } // if
            }}>
                {!!editMode && (editMode !== 'full') && <>
                    {(editMode === 'name'      ) && <SimpleEditDialog product={product} edit={editMode} onClose={handleEditDialogClose} editorComponent={<TextEditor       required={true } />} />}
                    {(editMode === 'price'     ) && <SimpleEditDialog product={product} edit={editMode} onClose={handleEditDialogClose} editorComponent={<CurrencyEditor   currencySign={getCurrencySign()} currencyFraction={COMMERCE_CURRENCY_FRACTION_MAX} />} />}
                    {(editMode === 'stock'     ) && <SimpleEditDialog product={product} edit={editMode} onClose={handleEditDialogClose} editorComponent={<StockEditor      theme='primaryAlt' />} />}
                    {(editMode === 'visibility') && <SimpleEditDialog product={product} edit={editMode} onClose={handleEditDialogClose} editorComponent={<VisibilityEditor theme='primaryAlt' />} />}
                </>}
            </ModalStatus>
            <ModalStatus theme='primary' modalCardStyle='scrollable' backdropStyle='static' onExpandedChange={({expanded}) => {
                if (!expanded) {
                    setEditMode(null);
                    setProduct({...product});
                } // if
            }}>
                {!!editMode && (editMode === 'full') && <FullEditDialog product={product} onClose={handleEditDialogClose} />}
            </ModalStatus>
        </div>
    )
}