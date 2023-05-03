export interface ProductEntry {
    _id            ?: string
    
    visibility      : string
    
    name            : string
    
    price           : number
    shippingWeight ?: number
    
    stock          ?: number
    
    description    ?: string
    images          : string[]
    path           ?: string
}