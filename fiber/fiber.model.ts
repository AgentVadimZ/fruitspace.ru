import {atom} from "recoil";

// USER ----

type Notification = {
    uuid: string
    target_uid: number
    title: string
    text: string
    image?: string
    send_date: string
    expire_date: string
    user_read: boolean
}

type UserModel = {
    status?: string
    uname: string
    name: string
    surname?: string
    email: string
    profile_pic: string
    vk_id: string
    discord_id: string
    balance: number
    shop_balance: number
    reflink: string
    is_partner: boolean
    is_admin: boolean
    is_2fa: boolean

    servers?: {
        gd?: any
        mc?: any
        cs?: any
    }
    top_servers?: Object
}

const userAtom = atom<UserModel>({
    key: 'user',
    default: {} as UserModel
})

// TRANSACTION ----
type TransactionModel = {
    id: number
    pay_id: string
    uid: number
    amount: number
    created_at: string
    is_active: boolean
    method: string
    go_pay_url: string
}

// SHOP ITEM ----
type ShopItemModel = {
    uuid: string
    name: string
    price: number
    stock: number
    inf_stock: boolean
    image: string
    description: string
    currency: string
    shop_id: number
}

// SHOP ----
type ShopModel = {
    id: number
    name: string
    owner_id: number
    balance: number
    items?: ShopItemModel[]
}

// SERVER GD ----
type ServerGDModel = {
    srvid: string
    srv_name: string
    plan: number
    owner_id: number
    db_password: string
    srv_key: string
    user_count: number
    level_count: number
    comment_count: number
    post_count: number
    creation_date: string
    expire_date: string
    client_android_url?: string
    client_ios_url?: string
    client_windows_url?: string
    client_macos_url?: string
    auto_pay: boolean
    backups?: Object
    m_stat_history?: Object
    icon: string
    description: string
    text_align: number
    visits: number
    discord: string
    vk: string
    is_space_music: boolean
    is_22: boolean
    is_custom_textures: boolean
    version: string
    recipe: string
}

type ServerConfig = {
    Srv: ServerGDModel
    Tariff: Object
    CoreConfig: Object
}

const serverGDAtom = atom<ServerConfig>({
    key: 'server',
    default: {} as ServerConfig
})


// GD ACL ----
const serverGDACLModel = {}


// atoms
export {userAtom, serverGDAtom}

// types
export type {
    Notification,
    UserModel,
    TransactionModel,
    ShopItemModel,
    ShopModel,
    ServerGDModel,
    ServerConfig
}