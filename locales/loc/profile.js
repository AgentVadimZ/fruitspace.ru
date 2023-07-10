

const profileLocale = {
    "/profile/login": {
        confirmationSent: {
            ru: "На почту было отправлено письмо с подтверждением",
            en: "A confirmation was sent to your email inbox"
        },
        regSuccess: {
            ru: "Регистрация прошла успешно",
            en: "Registered successfully"
        },
        err: {
            ru: "Произошла ошибка: ",
            en: "An error occurred: "
        },

        loginSuccess: {
            ru: "Вход произошел успешно",
            en: "Logged in succesfully"
        },
        passResetSuccess: {
            ru: "Пароль успешно сброшен. Проверьте почту",
            en: "Password has been successfully reset. Check your email"
        },

        loginO: {
            ru: [
                "Зарегистрироваться",
                "Восстановить пароль",
                "Войти"
            ],
            en: [
                "Register",
                "Reset password",
                "Log in"
            ]
        },
        regField: {
            ru: [
                "Имя (англ)",
                "Фамилия (англ)",
                "Пароль",
                "Код 2ФА"
            ],
            en: [
                "Name",
                "Surname",
                "Password",
                "2FA code"
            ]
        },
        accPass: {
            ru: [
                "Уже есть аккаунт?",
                "Нет аккаунта?",
                " я вспомнил пароль",
                " я забыл пароль",
                "А нет,",
                "Хуже,"
            ],
            en: [
                "Already have an account?",
                "No account?",
                "I remembered the password",
                "I forgot my password",
                "Wait,",
                "Worse,"
            ]
        }
    },


    "/profile": {
        nav: {
            ru: "Панель",
            en: "Dashboard"
        },
        hello: {
            ru: "Привет",
            en: "Hello"
        },
        itsYou: {
            ru: "Это вы",
            en: "This is you"
        },
        mostPopular: {
            ru: [
                "А это ваш самый популярный сервер",
                "...и похоже у вас нет серверов"
            ],
            en: [
                "And this is your most popular server",
                "...and it looks like you don't have any servers"
            ]
        },
    },


    "/profile/servers": {
        nav: {
            ru: "Мои серверы",
            en: "My Servers"
        }
    },


    "/profile/user": {
        nav: {
            ru: "Аккаунт",
            en: "Account"
        },
        err: {
            ru: "Произошла ошибка: ",
            en: "An error occurred: "
        },
        profileUpdateSuccess: {
            ru: "Профиль обновлен успешно",
            en: "Profile updated successfully"
        },
        passDontMatch: {
            ru: "Новые пароли не совпадают",
            en: "Entered passwords don't match"
        },
        passChangeSuccess: {
            ru: "Пароль обновлен успешно",
            en: "Password updated successfully"
        },
        picChangeSuccess: {
            ru: "Аватар обновлен успешно",
            en: "Avatar updated successfully"
        },
        picChange: {
            ru: "Изменить фотографию (Max: 5MB)",
            en: "Edit your profile pic (Max: 5MB)"
        },
        accInfo: {
            ru: [
                "Имя (англ)",
                "Фамилия (англ)"
            ],
            en: [
                "Name",
                "Surname"
            ]
        },
        save: {
            ru: "Сохранить",
            en: "Save"
        },
        reset: {
            ru: "Сбросить фотографию",
            en: "Reset photo"
        },
        options: {
            ru: [
                "Изменить пароль",
                "Отключить 2ФА",
                "Включить 2ФА",
                "Привязать Discord",
                "Discord привязан"
            ],
            en: [
                "Change password",
                "Disable 2FA",
                "Enable 2FA",
                "Connect Discord",
                "Discord connected"
            ]
        },
        cancel: {
            ru: "Отмена",
            en: "Cancel"
        },
        chPassword: {
            ru: [
                "Изменить пароль",
                "Текущий пароль",
                "Новый пароль",
                "Подтвердите новый пароль"
            ],
            en: [
                "Change password",
                "Current password",
                "New password",
                "Confirm new password"
            ]
        },
        twoFA: {
            ru: [
                "Двухфакторная аутентификация",
                "Введите код",
                "Запросить код",
                "Секрет",
                "Подтвердить",
                "2ФА успешно включена, не потеряйте код!"
                ],
            en: [
                "Two-factor authentication",
                "Enter 2FA code",
                "Request code",
                "Secret",
                "Confirm",
                "2FA is enabled, don't lose you code!"
            ]
        }
    },


    "/profile/billing" : {
        nav: {
            ru: "Биллинг",
            en: "Billing"
        },
        err: {
            ru: "Произошла ошибка: ",
            en: "An error occurred: "
        },
        tabs: {
            ru: [
                "Баланс",
                "Магазины"
            ],
            en: [
                "Wallet",
                "Shops"
            ]
        },
        amount: {
            ru: [
                "Пополнение баланса на ",
                "Оплата через "
            ],
            en: [
                "Transaction of ",
                "Payment via "
            ]
        },
        noPayments: {
            ru: "Нет транзакций",
            en: "No transactions"
        },
        withdraw: {
            ru: "Типа возможность вывода баланса магазина. Но пока нет",
            en: "Here should be nice interface for shop balance withdrawal, but we don't have shops yet"
        },
        minMax: {
            ru: [
                "Минимальная сумма для пополнения - 20₽",
                "Максимальная сумма для пополнения - 100000₽"
            ],
            en: [
                "Minimum amount is 20₽",
                "Maximum amount is 100000₽"
            ]
        },
        sum: {
            ru: "Сумма",
            en: "Amount"
        },
        payment : {
            ru: [
                "Пополнить",
                "Выберите метод оплаты",
                "Платежная система",
            ],
            en: [
                "Top up",
                "Choose payment method",
                "Payment system"
            ]
        },
        paymentSystem: {
            ru: [
                "Подходит для Qiwi и банковских карт",
                "SberPay, Тинькофф и ЮMoney",
                "Банковские карты, криптовалюты и PerfectMoney"
                ],
            en: [
                "Suitable for Qiwi and bank cards",
                "SberPay, Tinkoff and ЮMoney",
                "Bank cards, cryptocurrencies and PerfectMoney"
                ]
        }, //Короче, у нас же для нерусских только Енот, так я хз насчёт перевода, придумай чё нибудь
        paymentFail: {
            ru: "*Если оплата не удалась или деньги не пришли, откройте тикет на Discord сервере или напишите нам в ВК. Хотя такого обычно не происходит",
            en: "*If payment failed or the money did not arrive, open a ticket on the Discord server or write to us in VK. Although this usually does not happen"
        },
        goToPayment: {
            ru: "Перейти к оплате",
            en: "Top up"
        }
    }, 
}

export {profileLocale}