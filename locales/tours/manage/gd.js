import Img from "../../../components/assets/tours/img.png";
import Img1 from "../../../components/assets/tours/img_1.png";

const IndexTour = [
    {
        title: 'Карточка сервера',
        description: 'Здесь вы можете увидеть название, иконку, тариф и ID сервера. ID сервера состоит из 4 символов и зачастую требуется при обращении в техподдержку',
        cover: null,
        target: "servcard",
        placement: 'bottom'
    },
    {
        title: 'Изменение тарифа',
        description: 'Вы всегда можете продлить или изменить тариф нажатием на кнопку вашего текущего тарифа',
        cover: null,
        target: "servtariff",
        placement: 'bottom'
    },
    {
        title: 'Сборка установщиков',
        description: 'Здесь можно перейти на страницу загрузки вашего приватного сервера, также тут отображается текущий статус сборки',
        cover: <div className="flex items-center justify-center">
            <img className="h-32 !w-auto" src={Img.src} />
            <img className="h-32 !w-auto" src={Img1.src} />
        </div>,
        target: "build",
        placement: 'bottom'
    },
    {
        title: 'Боковая панель',
        description: 'Здесь находятся все нужные разделы для удобного управления вашим приватным сервером: от лога безопасности до настроек ролей',
        cover: null,
        target: "nav",
        placement: 'right'
    },
    {
        title: 'Интерактивная помощь',
        description: 'В различных разделах панели есть кнопка помощи, при нажатии которой запустится интерактивная помощь, как сейчас',
        cover: null,
        target: "help",
        placement: 'topLeft'
    },
]


const MusicTour = [
    {
        title: 'Загрузка музыки',
        description: 'Если вы включили "Музыка FruitSpace" в настройках, то вы можете загрузить музыку нажатием на иконку нужного сервиса',
        cover: null,
        target: "newsong",
        placement: 'bottom'
    },
    {
        title: 'Прослушивание музыки',
        description: 'При проигрывании музыки вы можете управлять воспроизведением',
        cover: null,
        target: "player",
        placement: 'bottom'
    },
    {
        title: 'Поиск музыки',
        description: 'Здесь отображается список всех треков на приватном сервере, вы можете искать музыку по id, названию или исполнителю',
        cover: null,
        target: "songlist",
        placement: 'center'
    },
]

const RolesTour = [
    {
        title: 'Настройка ролей',
        description: 'Роли дают вам и другим игрокам права модератора. Цвет роли влияет на цвет комментариев, а иконка - только на наличие иконки в игре. Сами полномочия настраиваются отдельно. Подробнее вы можете прочитать в документации',
        cover: null,
        target: "roles",
        placement: 'center'
    },
]

const ChestsTour = []

const SettingsTour = [
    {
        title: 'База данных',
        description: 'Иногда требуется перейти в базу данных для решения некоторых проблем или более тонкой настройки. Здесь указаны логин и пароль для доступа, а также кнопка сброса пароля, если он попал в плохие руки.',
        cover: null,
        target: "db",
        placement: 'bottom'
    },
    {
        title: 'Размер топа игроков',
        description: 'Данный параметр позволяет настроить размер топа игроков, отображаемый в лидербордах вашего сервера',
        cover: null,
        target: "topsize",
        placement: 'bottom'
    },
    {
        title: 'Антибот',
        description: 'Это настройки безопасности вашего приватного сервера, которые защищают вас от спама на сервере. Защита от спама уровнями также включает ограничение на минимальое количество объектов в уровне: 100 объктов',
        cover: null,
        target: "antibot",
        placement: 'bottom'
    },
    {
        title: 'Кастомизация сервера',
        description: 'Здесь вы настраиваете все, что отображается на странице загрузки вашего приватного сервера: описание, соцсети, установщики (Singularity и выше) и многое другое.',
        cover: null,
        target: "customization",
        placement: 'top'
    },
]



export {IndexTour, MusicTour, RolesTour, ChestsTour, SettingsTour}