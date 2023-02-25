

const gdSettingsLocale = {
    nav: {
        ru: "Настройки сервера",
        en: "Server settings"
    },

    dbPassResetSuccess: {
        ru: "Пароль успешно сброшен, обновите страницу",
        en:"Password has been successfully reset, refresh the page"
    },
    dbPassResetErr: {
        ru: "Не удалось сбросить пароль",
        en: "Failed to reset password"
    },
    copy: {
        ru: "Скопировано",
        en: "Copied"
    },
    saveSuccess: {
        ru: "Настройки сохранены, обновите страницу",
        en: "Settings are saved, refresh the page"
    },
    saveErr: {
        ru: "Не удалось сохранить настройки",
        en: "Failed to save settings"
    },
    logoUpd: {
        ru: "Логотип обновлен успешно",
        en: "Icon has been updated successfully"
    },
    goBuildLab: {
        ru: "Таак, собираем ваши установщики...",
        en: "Building installers..."
    },
    goBuildLabSuccess: {
        ru: "Все готово, скоро ваши установщики будут доступны для всех",
        en: "Everything is ready, soon your installers will be available"
    },
    universalErr: {
        ru: "Что-то пошло не так: ",
        en: "Something went wrong: "
    },
    connectionErr: {
        ru: "Проблемы с подключением",
        en: "Connection problem" // Connection Terminated. I'm sorry to interrupt you Elizabeth, if you still even remember that name, but I'm afraid you've been misinformed. You are not here to receive a gift, nor have you been called here by the individual you assume, although you have indeed been called. You have all been called here into a labyrinth of sounds and smells, misdirection and misfortune. A labyrinth with no exit, a maze with no prize. You don't even realize that you are trapped. Your lust for blood has driven you in endless circles chasing the cries of children in some unseen chamber, always seeming so near, yet somehow out of reach. But you will never find them. None of you will. This is where your story ends. And to you, my brave volunteer, who somehow found this job listing not intended for you. Although there was a way out planned for you, I have a feeling that's not what you want. I have a feeling that you are right where you want to be. I am remaining as well, I am nearby. This place will not be remembered and the memory of everything that started this can finally begin to fade away, as the agony of every tragedy should. And to you monsters trapped in the corridors, be still, and give up your spirits. They don't belong to you. For most of you, I believe there is peace and perhaps more, waiting for you after the smoke clears. Although for one of you, the darkest pit of Hell has opened to swallow you whole, so don't keep the devil waiting, old friend. My daughter, if you can hear me, I knew you would return as well. It's in your nature to protect the innocent. I'm sorry that on that day, the day you were shut out and left to die, no one was there to lift you up into their arms the way you lifted others into yours. And then, what became of you, I should have known you wouldn't be content to disappear, not my daughter. I couldn't save you then, so let me save you now. It's time to rest, for you, and for those you have carried in your arms. This ends, for all of us. End Communication.
    },
    deleteSuccess: {
        ru: "Сервер удален успешно",
        en: "Server deleted successfully"
    },
    dontForget: {
        ru: "Не забудьте сохранить изменения",
        en: "Don't forget to save the changes"
    },
    save: {
        ru: "Сохранить",
        en: "Save"
    },
    db: {
        ru: "База Данных",
        en: "Database"
    },
    dbFields: {
        ru: [
            "Логин",
            "Пароль"
        ],
        en: [
            "Login",
            "Password"
        ]
    },
    dbSettings: {
        ru: [
            "Сбросить пароль",
            "Перейти в БД"
        ],
        en: [
            "Reset password",
            "Go to DB"
        ]
    },
    coreSettings: {
        ru: [
            "Настройки ядра",
            "Размер топа игроков",
            "Лидерборды",
            "игроков",
            "Антибот",
            "Музыка FruitSpace",
            "Автоактивация аккаунтов",
            "Защита от спама уровнями"
        ],
        en: [
            "Core settings",
            "Size of leaderboards",
            "Leaderboards",
            "players",
            "Antibot",
            "FruitSpace music",
            "Accounts auto-activation",
            "Anti-spam"
        ]
    },
    tips: {
        ru: [
            <span style={{fontSize:"11pt"}}>Кастомная музыка из NewGrounds, YouTube, VK и др. добавляется через панель.<br/>
                                    В отключенном состоянии используется музыка с NewGrounds напрямую (с обходом вайтлиста)<br/>
                                    ⚠️ Можно включить один раз, так как треки будут преобразованы</span>,
            <span style={{fontSize:"11pt"}}>Кулдаун сообщений, комментариев, защита от накрутки и спама уровнями<br/><br/>
                                • Защита от спама уровнями работает на основе частоты выкладывания уровней, поэтому иногда может по ошибке банить игроков
                                    (например после рекламы игроки начинают строить очень много уровней за сутки). <b>Отключите, если это является проблемой</b></span>
        ],
        en: [
            <span style={{fontSize:"11pt"}}>Custom music from NewGrounds, YouTube, VK, etc. is added via panel.<br/>
                                    When disabled, music from NewGrounds is used directly (bypassing the whitelist)<br/>
                                    ⚠️ You can turn it on once, as the tracks will be converted</span>,
            <span style={{fontSize:"11pt"}}>Messages and comments cooldown, protection from stat cheating and level spamming<br/><br/>
                                Level antispam works based on level frequency of posting, so sometimes it can ban players by mistake
                                    (for example, after ad campaign, players begin to build a lot of levels per day). <b>Disable if this becomes a problem</b></span>
        ]
    },
    customSettings: {
        ru: [
            "Кастомизация сервера",
            "Описание",
        //    <><p>Используйте <span className={styles.CodeBlock}>#players#</span> и <span className={styles.CodeBlock}>#levels#</span> чтобы
        //                        подставить количество игроков и уровней прямо на странице загрузки</p></>
        ],
        en: [
            "Server customization",
            "Description",
            //<><p>Use <span className={styles.CodeBlock}>#players#</span> and <span className={styles.CodeBlock}>#levels#</span> to
            //                    insert number of players and levels directly to download page</p></>
        ]
    },
    aboutSectDesc: {
        ru: [
            "Используйте",
            "и",
            "чтобы подставить количество игроков и уровней прямо на странице загрузки"
        ],
        en: [
            "Use",
            "and",
            "to insert number of players and levels directly to download page"
        ]
    },
    systemSettings: {
        ru: [
            "Системные настройки",
            "Ядро ",
            "Управление",
            "Удалить GDPS",
            "Резервные копии",
            "Модули ядра ",
            "Бот Discord",
        ],
        en: [
            "System settings",
            "Core ",
            "Manage",
            "Delete GDPS",
            "Backups",
            "Modules ",
            "Discord Bot",
        ]
    },
    dbResetConfirm: {
        ru: [
            <>
                    <h3>⛔ Стоп-стоп-стоп!</h3>
                    <p><b>Вы точно хотите сбросить пароль?</b><br/>Обычно сброс необходим в случае, если пароль базы данных оказался
                    в плохих руках.</p>
                    <p>Вы в любой момент можете узнать пароль в настройках, но мы все-равно хотим убедиться, что вы знаете, что делаете</p>
            </>,
            "Сбросить пароль",
            "Пожалуй, нет"
        ],
        en: [
            <>
                    <h3>⛔ Wait-wait-wait!</h3>
                    <p><b>Are you sure you want to reset your password?</b><br/>Usually, a reset is necessary if the database password turns out to be
                    in the wrong hands.</p>
                    <p>You can see password in the settings at any time, but we still want to make sure that you know what you are doing</p>
            </>,
            "Reset password",
            "Perhaps not"
        ]
    },
    socials: {
        ru: [
            <>
                <h3>💬 Ссылки на медиа</h3>
                <p>Инвайт для Discord сервера генерируйте <b style={{color:"var(--primary-color)"} }>бессрочным</b></p>
            </>,
            "Паблик ВКонтакте",
            "Сервер Discord",
            "Готово"
        ],
        en: [
            <>
                <h3>💬 Social media links</h3>
                <p>Create a <b style={{color:"var(--primary-color)"} }>permanent</b> invitation to your Discord server</p>
            </>,
            "VK Group",
            "Discord server",
            "Done"
        ]
    },
    deleteConfirm: {
        ru: [
            <><h3>🧨Удаляем сервер?🧨</h3>
                        <p><b>Вы точно хотите удалить сервер?</b><br/>Мы не сохраним резервные копии и сервер удалится навсегда без возврата средств.<br/></p>
                        </>,
            "Введите ",
            "Код неверный",
            "Удалить",
            "Отмена"
        ],
        en: [
            <><h3>🧨Delete GDPS?🧨</h3>
                        <p><b>Do you want to delete this server?</b><br/>We won&apos;t save backups and the server will be permanently deleted without a refund.<br/></p>
                        </>,
            "Enter ",
            "Invalid code",
            "Delete",
            "Cancel"
        ]
    },
    backups: {
        ru: [
            "☁️ Резервные копии",
            "Сделаем вид, что копия ",
            " восстановлена",
             <p>Здесь хранятся последние резервные копии (делаются раз в 3 дня).<br/>
                    Нажмите на значок облака, чтобы восстановить</p>,
            "Выйти",

        ],
        en: [
            "☁️ Backups",
            "Let's pretend the backup ",
            " has been restored",
            <p>The latest backups are stored here (made every 3 days).<br/>
                    Click on the cloud icon to restore</p>,
            "Cancel"
        ]
    },
// ඞ Amogus
    buildLab: {
        ru: [
            "Название",
            "Версия 2.2 не является официальной, поэтому может содержать баги",
            "Использование текстурпаков для Android приводит к большому размеру игры",
            "Текстурпак",
            "Оригинальный",
            "Запуск сборки",
            "Отмена",
            "Установщики"
        ],
        en: [
            "Name",
            "Version 2.2 is not official, so it may contain bugs",
            "Using texture packs for Android leads to a large size of the game",
            "Texture pack",
            "Original",
            "Start build",
            "Cancel",
            "Installers"
        ]
    }

}

export {gdSettingsLocale}