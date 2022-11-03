import {atom} from "recoil";

const UserState = atom({
    key: "userState",
    default: {
        uname: null,
        profilePic: null,
        bal: 0,
        shop_bal: 0,
        usd: false,

        notifications: [{
            id: "ababbabba",
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