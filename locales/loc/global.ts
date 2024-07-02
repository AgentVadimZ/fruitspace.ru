

const globalLocale = {

    create: {
        ru: "Создать",
        en: "Create"
    },

    navName: {
        ru: "Игровой хостинг",
        en: "Game Hosting"
    },

    navLogout: {
        ru: "Выйти",
        en: "Log out"
    },
    navLogin: {
        ru: "Войти",
        en: "Log in"
    },

    navNoNewNotifications: {
        ru: "Нет новых уведомлений",
        en: "No new notifications"
    },

    navMyShops: {
        ru: "Мои магазины",
        en: "My shops"
    },

    panelSideNav: {
        ru: {
            dashboard: "Главная",
            servers: "Мои серверы",
            account: "Аккаунт",
            billing: "Биллинг",
            shops: "Мои магазины"
        },
        en: {
            dashboard: "Dashboard",
            servers: "My servers",
            account: "Account",
            billing: "Billing",
            shops: "My shops"
        }
    },

    panelGDPSNav: {
        ru: {
            analytics: "Аналитика",
            music: "Музыка",
            roles: "Игроки и роли",
            chests: "Сундуки",
            quests: "Уровни и квесты",
            levelpacks: "Паки уровней",
            settings: "Настройки",
            profile: "Профиль игрока",
            actions: "Действия",
            shops: "Мои магазины",
            gdlab: "GDLab"
        },
        en: {
            analytics: "Analytics",
            music: "Music",
            roles: "Players and Roles",
            chests: "Chests",
            quests: "Levels and Quests",
            levelpacks: "LevelPacks",
            settings: "Settings",
            profile: "Player profile",
            actions: "Actions",
            shops: "My shops",
            gdlab: "GDLab"
        }
    },

    "loadmore": {
        ru: "Загрузить еще",
        en: "Load more"
    },


    "footer.about": {
        ru: "О нас",
        en: "About us"
    },
    "footer.team": {
        ru: "Команда",
        en: "Our team"
    },
    "footer.partnership": {
        ru: "Партнерская программа",
        en: "Partnership"
    },
    "footer.tos": {
        ru: "Условия использования",
        "en": "Terms of use"
    },
    "footer.docs": {
        ru: "Документация",
        en: "Docs"
    },

    "footer.hostingmc":{
        ru: "Хостинг Minecraft",
        en: "Minecraft hosting"

    },
    "footer.hostinggd":{
        ru: "Хостинг Geometry Dash",
        en: "Geometry Dash hosting"
    },
    "footer.hostingcs":{
        ru: "Хостинг Counter Strike",
        en: "Counter Strike hosting"
    },

    "addaccount": {
        ru: "Добавить аккаунт",
        en: "Add account"
    },


    funcShowServers: {
        ru: (num)=> {
            num%=10
            switch (num) {
                case 1:
                    return "сервер"
                case 2:
                case 3:
                case 4:
                    return "сервера"
                default:
                    return "серверов"

            }
        },
        en: (num)=> {
            num%=10
            switch (num) {
                case 1:
                    return "server"
                default:
                    return "servers"

            }
        }
    },

    funcLvlPlayerServer: {
        ru: (players, levels)=>{
            let str=""+players
            let cplayers=players%10
            switch (cplayers) {
                case 1:
                    str+=" игрок"
                    break
                case 2:
                case 3:
                case 4:
                    str+=" игрока"
                    break
                default:
                    str+=" игроков"
            }
            str+=" • "+levels
            let clevels=levels%10
            switch (clevels) {
                case 1:
                    str+=" уровень"
                    break
                case 2:
                case 3:
                case 4:
                    str+=" уровня"
                    break
                default:
                    str+=" уровней"
            }
            return str
        },
        en: (players, levels)=>{
            let str=""+players
            let cplayers=players%10
            switch (cplayers) {
                case 1:
                    str+=" player"
                    break
                default:
                    str+=" players"
            }
            str+=" • "+levels
            let clevels=levels%10
            switch (clevels) {
                case 1:
                    str+=" level"
                    break
                default:
                    str+=" levels"
            }
            return str
        }
    },

    funcLvlsServer: {
        ru: (levels)=>{
            let str=""+levels
            let clevels=levels%10
            switch (clevels) {
                case 1:
                    str+=" уровень"
                    break
                case 2:
                case 3:
                case 4:
                    str+=" уровня"
                    break
                default:
                    str+=" уровней"
            }
            return str
        },
        en: (levels)=>{
            let str=""+levels
            let clevels=levels%10
            switch (clevels) {
                case 1:
                    str+=" level"
                    break
                default:
                    str+=" levels"
            }
            return str
        }
    },

    funcParseErr: {
        ru: (err, msg = null)=>{
            let errc = err.split("|")[1] || err
            msg = msg || err
            switch (errc){
                case "eml": return "Неверный формат email"
                case "uname_shrt": return "Слишком короткий логин (необходимо 5+ символов)"
                case "uname_long": return "Слишком длинный логин (необходимо меньше 32 символов)"
                case "name_shrt": return "Слишком короткое имя (необходимо 2+ символов)"
                case "name_long": return "Слишком длинное имя (необходимо меньше 120 символов)"
                case "surname_shrt": return "Слишком короткая фамилия (необходимо 2+ символов)"
                case "surname_long": return "Слишком длинная фамилия (необходимо меньше 120 символов)"
                case "uname": return "Логин содержит недопустимые символы"
                case "name": return "Имя содержит недопустимые символы"
                case "surname": return "Фамилия содержит недопустимые символы"
                case "pwd_shrt": return "Слишком короткий пароль (необходимо 8+ символов)"
                case "pwd_long": return "Слишком длинный пароль (необходимо меньше 120 символов)"
                case "pwd": return "Пароль содержит недопустимые символы"
                case "uname_taken": return "Данное имя пользователя уже занято"
                case "eml_taken": return "Аккаунт с данной почтой уже зарегистрирован"
                case "reg": return "Техническая ошибка при регистрации. Сообщите о ней в тех. поддержку!"
                case "ver": return "Ошибка отправки письма с подтверждением. Сообщите о ней в тех. поддержку!"
                case "captcha": return "Не удалось пройти капчу. Попробуйте еще раз"
                case "nouser": return "Пользователь не найден"
                case "ban": return "Данный аккаунт заблокирован. Обратитесь в техподдержку"
                case "act": return "Данный аккаунт не активирован"
                case "nopwd": return "Неверный пароль"
                case "2fa": return "Неверный токен 2ФА"
                case "2fa_enabled": return "2ФА уже включен"
                case "form": return "Не удалось прочитать запрос"
                case "file": return "Ошибка чтения файла"
                case "type": return "Неверный тип файла"
                case "tr_create": return "Не удалось создать транзакцию, обратитесь в поддержку"
                case "promo_invalid": return "Неверный промокод"
                case "promo_expire": return "Срок действия промокода истек"
                case "promo_limit": return "Количество использований промокода достигло своего предела"
                case "bal": return "Недостаточно средств для покупки"
                case "invhash": return "Не удалось верифицировать баланс, свяжитесь с поддержкой"
                case "no_nodes": return "Нет доступных нод для создания сервера"
                case "wisp_account": return "Не удалось создать аккаунт в панели, свяжитесь с поддежкой!"
                case "wisp_server": return "Не удалось создать сервер, свяжитесь с поддежкой!"
                case "inv_core": return "Выбрано неподдерживаемое ядро"
                case "inv_version": return "Выбрана неподдерживаемая версия"
                case "inv_storage": return "Выбран слишком большой дополнительный объем диска"
                default: return msg

            }
        },
        en: (err, msg = null)=>{
            let errc = err.split("|")[1] || err
            msg = msg || err
            switch (errc){
                case "eml": return "Invalid email format"
                case "uname_shrt": return "Username is too short (5+ symbols needed)"
                case "uname_long": return "Username is too long (max 32 symbols)"
                case "name_shrt": return "Name is too short (2+ symbols needed)"
                case "name_long": return "Name is too long (max 120 symbols)"
                case "surname_shrt": return "Surname is too short (2+ symbols needed)"
                case "surname_long": return "Surname is too long (max 120 symbols)"
                case "uname": return "Username contains invalid symbols"
                case "name": return "Name contains invalid symbols"
                case "surname": return "Surname contains invalid symbols"
                case "pwd_shrt": return "Password is too short (8+ symbols needed)"
                case "pwd_long": return "Password is too long (max 120 symbols)"
                case "pwd": return "Password contains invalid symbols"
                case "uname_taken": return "That username is already taken"
                case "eml_taken": return "Provided email is already used"
                case "reg": return "Unexpected registration error. Contact Support for resolution!"
                case "ver": return "Unable to send confirmation email. Contact Support for resolution!"
                case "captcha": return "Unable to verify captcha. Try again"
                case "nouser": return "User not found"
                case "ban": return "User is banned. Contact Support for resolution"
                case "act": return "Account is not activated"
                case "nopwd": return "Invalid password"
                case "2fa": return "Invalid 2FA code"
                case "2fa_enabled": return "2FA is already enabled"
                case "form": return "Unable to read request"
                case "file": return "Unable to read file"
                case "type": return "Invalid file type"
                case "tr_create": return "Unable to create transaction. Contact Support for resolution"
                case "promo_invalid": return "Invalid promo code"
                case "promo_expire": return "Promo code is expired"
                case "promo_limit": return "Promo code usage limit is depleted"
                case "bal": return "Not enough money to make a purschase"
                case "invhash": return "Failed to verify balance hash, please contact FruitSpace support"
                default: return msg
            }
        }
    }

}


export {globalLocale}