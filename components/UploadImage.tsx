import { useState } from 'react'
import { resolveMediaUrl } from '@/libs/mediaStorage.client'
import { GalleryEditor } from './editors/GalleryEditor/GalleryEditor'
import type { ProductEntry } from '@/models/Product'
import axios from 'axios'
import { Image } from '@heymarco/image'



export const UploadImage = () => {
    const name = 'Nokia 3310';
    const [images, setImages] = useState<string[]>([
        'nokia-3310/nokia-3310_0.jpg',
        'nokia-3310/nokia-3310_1.jpg',
        'nokia-3310/nokia-3310_2.jpg',
        'nokia-3310/nokia-3310_3.jpg',
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
    );
};