import { useState } from 'react'
import { resolveMediaUrl } from '@/libs/mediaStorage.client'
import { GalleryEditor } from './editors/GalleryEditor/GalleryEditor'
import type { ProductEntry } from '@/models/Product'
import axios from 'axios'
import { Image } from '@heymarco/image'



export const UploadImage = () => {
    const name = 'Nokia 3310';
    const [images, setImages] = useState<string[]>([
        '@ test/u3haisnhyszdzn7qm0ol',
        '@ test/o6c5crkgoqmeth9kjgzq',
        '@ test/sqtj1s6xyhebxo2pxie4',
        '@ test/q8vpk6xbxeyhwkgwfwxr',
    ]);
    return (
        <GalleryEditor<HTMLElement, string>
            // values:
            value={images}
            onChange={(value) => {
                setImages(value);
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
                formData.append('folder', '@ test');
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
    );
};