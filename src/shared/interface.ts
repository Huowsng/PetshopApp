export interface IUser {
    id: String,
    username: String,
    name: String,
    email?: String,
    role: boolean
}

export interface IProductprops {
    item: IProduct
}

export interface ITypeProduct {
    tittle: String,
    amount: Number
}

export interface IProductCart {
    title: String,
    price: number,
    image: any
}
export interface IProductWishList {
    title: String,
    price: number,
    image: any,
    status: boolean,
}

export interface IProduct {
    _id: string
    category: string
    checked: boolean
    description: string
    feedbacks: Feedback[]
    images: Images
    sold: number
    title: string
    types: Type[]
    price: string
}

export interface Feedback {
    _id: string
    content: string
    rating: number
    product_id: string
    user_id: string
    createdAt: string
    updatedAt: string
    image_url?: string
}

export interface Type {
    _id: string
    name: string
    price: number
    amount: number
    createdAt: string
    updatedAt: string
}

export interface Images {
    public_id: string
    url: string
}

export interface Assets {
    url: string
}

export interface IStore {
    appReducer: IReducer
}

export interface IReducer {
    token: String,
    isReloadCart: boolean,
}

export interface ICart {
    types: any
    total: number
    listOrderItems?: any[]
    address: string
    phone: string
    _id: string
    user_id: string
    status: string
    delivery: string,
    updatedAt: string
}

export interface IListOrderItem {
    itemType: IItemType
}

export interface IItemType {
    product_id: string
    type_id: string
    amount: number
    image: string
    product_name: string
    price: number
    type_name: string
}

export interface IProvinces {
    name: string
    code: number
    value: number
}

export interface IDelivery {
    shop_id: number
    client_id: number
    return_name: string
    return_phone: string
    return_address: string
    return_ward_code: string
    return_district_id: number
    from_name: string
    from_phone: string
    from_address: string
    from_ward_code: string
    from_district_id: number
    deliver_station_id: number
    to_name: string
    to_phone: string
    to_address: string
    to_ward_code: string
    to_district_id: number
    weight: number
    length: number
    width: number
    height: number
    converted_weight: number
    image_ids: any
    service_type_id: number
    service_id: number
    payment_type_id: number
    custom_service_fee: number
    sort_code: string
    cod_amount: number
    cod_collect_date: any
    cod_transfer_date: any
    is_cod_transferred: boolean
    is_cod_collected: boolean
    insurance_value: number
    order_value: number
    pick_station_id: number
    client_order_code: string
    cod_failed_amount: number
    cod_failed_collect_date: any
    required_note: string
    content: string
    note: string
    employee_note: string
    seal_code: string
    pickup_time: string
    items: IItemDelivery[]
    coupon: string
    coupon_campaign_id: number
    _id: string
    order_code: string
    version_no: string
    updated_ip: string
    updated_employee: number
    updated_client: number
    updated_source: string
    updated_date: string
    updated_warehouse: number
    created_ip: string
    created_employee: number
    created_client: number
    created_source: string
    created_date: string
    status: string
    pick_warehouse_id: number
    deliver_warehouse_id: number
    current_warehouse_id: number
    return_warehouse_id: number
    next_warehouse_id: number
    current_transport_warehouse_id: number
    leadtime: string
    order_date: string
    soc_id: string
    finish_date: any
    is_partial_return: boolean
    is_document_return: boolean
    updated_date_pick_shift: string
    transportation_status: string
    transportation_phase: string
    from_location: ILocation
    to_location: ILocation
}

export interface IItemDelivery {
    name: string
    quantity: number
    weight: number
}

export interface ILocation {
    lat: number
    long: number
}

export interface IProfile {
    address: string
    phone: string
    avatar: string
    name: string
    email: string
    birthday: string
    fullName: string
    sex: boolean
    pet: string[]
    createdAt: string
}