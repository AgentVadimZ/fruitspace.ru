import {gdAnalyticsLocale} from "./gd";
import {gdMusicLocale} from "./gd/music";
import {gdRolesLocale} from "./gd/roles";
import {gdSettingsLocale} from "./gd/settings";
import {gdChestsLocale} from "./gd/chests";
import {gdQuestsLocale} from "./gd/quests";
import {gdStoreLocale} from "./gd/store";
import {gdActionsLocale} from "./gd/actions";
import {gdLevelpacksLocale} from "./gd/levelpacks";
import {gdProfileLocale} from "./gd/profile";

const gdManageLocale = {
    "/manage/gd/[srvid]": gdAnalyticsLocale,
    "/manage/gd/[srvid]/music": gdMusicLocale,
    "/manage/gd/[srvid]/roles": gdRolesLocale,
    "/manage/gd/[srvid]/settings": gdSettingsLocale,
    "/manage/gd/[srvid]/chests": gdChestsLocale,
    "/manage/gd/[srvid]/quests": gdQuestsLocale,
    "/manage/gd/[srvid]/levelpacks": gdLevelpacksLocale,
    "/manage/gd/[srvid]/profile": gdProfileLocale,
    "/manage/gd/[srvid]/actions": gdActionsLocale,
    "/manage/gd/[srvid]/store": gdStoreLocale,

    "/gdps/[srvid]/music": gdMusicLocale,
}

export {gdManageLocale}