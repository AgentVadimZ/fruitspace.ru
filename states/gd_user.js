import {atom} from "jotai";


const GDUserState = atom({
    uid: 0,
    uname: "user",
    email: "default@email.com",
    is_banned: 0,
    role: {
        id: 1,
        name: "default_role",
        color: "255,255,255",
        permissions: {},
        badge: 1,
    },

    stars: 0,
    diamonds: 0,
    coins: 0,
    ucoins: 0,
    demons: 0,
    cpoints: 0,
    moons: 0,
    lvls_completed: 0,

    reg_date: "2023-03-03 03:03:03",
    blacklist: [],
    friends: [],

    icon_type: 0,
    clr_primary: 0,
    clr_secondary: 0,
    vessels: {
        cube: 1,
        ship: 1,
        ball: 1,
        ufo: 1,
        wave: 1,
        robot: 1,
        spider: 1,
        swing: 1,
    },

    youtube: "",
    twitch: "",
    twitter: "",
})

export {GDUserState}