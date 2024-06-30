

const ParseError = (err: string, message: string = ""): string => {
    switch (err){
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
        case "form": return "Не удалось прочитать запрос"
        case "file": return "Ошибка чтения файла"
        case "type": return "Неверный тип файла"
        case "tr_create": return "Не удалось создать транзакцию, обратитесь в поддержку"
        case "promo_invalid": return "Неверный промокод"
        case "promo_expire": return "Срок действия промокода истек"
        case "promo_limit": return "Количество использований промокода достигло своего предела"
        default: return `${err} (${message})`
    }
}

export default ParseError