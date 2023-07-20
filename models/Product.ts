import type { WysiwygEditorState } from "@/components/editors/WysiwygEditor"



export interface ProductEntry {
    _id            ?: string
    
    visibility      : string
    
    name            : string
    
    price           : number
    shippingWeight ?: number
    
    stock          ?: number
    
    description    ?: WysiwygEditorState|null
    images          : string[]
    path           ?: string
}