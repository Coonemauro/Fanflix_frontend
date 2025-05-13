export interface Category {
    strapi_id: number
    name: string
    slug: string
    leadImageTalent: Talent
}

type CategoryNode = {
    node: Category
}

export interface Subcategory {
    strapi_id: number
    name: string
    slug: string
    category: {
        strapi_id: number
        name: string
        slug: string
    }
    leadImageTalent: Talent
}

type SubcategoryNode = {
    node: Subcategory
}


export interface Talent {
    strapi_id: number
    slug: string
    active: boolean
    name: string
    description: string
    image: ImageType[]
    price: number
    fastDelivery: boolean
    deliveryDays: number
    fastDeliveryDays: number
    videoURL: string
    subcategory: Subcategory
    profileOrders: any
    viewCount: number
    completeOrderCount: number
}

type ImageType = {
    url: string
}

export interface Order {
    from: string
    to: string
    talent: number
    orderID: string
    userEmail: string
    occasion: string
    requestDescription: string
    payedAmount: number
    checkoutURL: string
    createdAt: string
    paymentID: string
    paymentStatus: string
    status: string
    updatedAt: string
    videoURL: string
    dueDate: string
}