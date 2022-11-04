import {atom} from "recoil";

const UserState = atom({
    key: "userState",
    default: {
        uname: null,
        name: "",
        surname: "",
        profilePic: null,
        is2fa: false,
        bal: 0,
        shop_bal: 0,
        usd: false,

        notifications: [{
            uuid: "ababbabba",
            target_uid: 1, // if 0 then global
            title: "title",
            text: "Max 75 sym",
        }],

        servers: {
            mc: 0,
            gd: 0,
            gta: 0,
        }
    },
})

export {UserState};


//             mc: [{
//                 name: "Title",
//                 id: 1000,
//                 proxy: "none",
//                 servers: 0,
//             }],
//             gd: [{
//                 name: "Title",
//                 id: "0xyz",
//                 plan: "Takeoff",
//                 players: 0,
//                 levels: 0,
//             }],
//             gta: [],