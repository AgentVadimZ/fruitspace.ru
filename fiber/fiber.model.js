import {atom} from "recoil";

// USER ----
const userModel = {
    uname: "uname",
    name: "name",
    surname: "surname",
    email: "email",
    profile_pic: "url",
    vk_id: "0",
    discord_id: "0",
    balance: 0,
    shop_balance: 0,
    reflink: "url",
    is_partner: false,
    is_admin: false,
    is_2fa: false,
    notifications: [{
        uuid: "nouuid",
        target_uid: 1, // if 0 then global
        title: "title",
        text: "Max 75 sym",
    }],

    servers: {mc: 0, gd: 0, gta: 0,},
    top_servers: {gd: null}
}

const userAtom = atom({
    key: 'user',
    default: userModel
})

// TRANSACTION ----
const transactionModel = {
    id: 0,
    pay_id: "0",
    uid: 0,
    amount: 0.0,
    created_at: "1970-01-01 00:00:00",
    is_active: false,
    method: "short",
    go_pay_url: "url"
}

// SHOP ITEM ----
const shopItemModel = {
    uuid: "uuid",
    name: "name",
    price: 0.0,
    stock: 0,
    inf_stock: false,
    image: "url",
    description: "desc",
    currency: "rub",
    shop_id: 0
}

// SHOP ----
const shopModel = {
    id: 0,
    name: "name",
    owner_id: 0,
    balance: 0.0,
    items: null
}

// SERVER GD ----
const serverGDModel = {
    srvid: "xxxx",
    srv_name: "name",
    plan: 0,
    owner_id: 0,
    db_password: "pass",
    srv_key: "key",
    user_count: 0,
    level_count: 0,
    comment_count: 0,
    post_count: 0,
    creation_date: "1970-01-01 00:00:00",
    expire_date: "1970-01-01 00:00:00",
    client_android_url: "url",
    client_ios_url: "url",
    client_windows_url: "url",
    client_macos_url: "url",
    auto_pay: false,
    backups: {},
    m_stat_history: {},
    icon: "url",
    description: "desc",
    text_align: 0,
    visits: 0,
    discord: "code",
    vk: "code",
    is_space_music: false,
    is_22: false,
    is_custom_textures: false
}

const serverGDAtom = atom({
    key: 'server',
    default: {
        Srv: serverGDModel,
        Tariff: null,
        CoreConfig: null
    }
})

// NOTIFICATION ----
const notificationModel = {
    uuid: "uuid",
    target_uid: 0,
    title: "title",
    text: "text",
    send_date: "1970-01-01 00:00:00",
    expire_date: "1970-01-01 00:00:00",
    user_read: false
}

// GD ACL ----
const serverGDACLModel = {}


export {userModel, userAtom, transactionModel, shopModel, shopItemModel, serverGDModel, serverGDAtom, notificationModel, serverGDACLModel}