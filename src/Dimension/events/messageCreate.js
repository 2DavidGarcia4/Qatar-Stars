"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreateEvent = void 0;
const db_1 = require("../db");
const messageCreateEvent = (msg, client) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    const server = client.guilds.cache.get(db_1.botDB.serverId);
    // console.log(msg.channelId)
    if (msg.channelId == '942882096693772328') {
        msg.react('1035717696622428170');
        msg.react('938641123348475914');
    }
    if (server === null || server === void 0 ? void 0 : server.channels.cache.filter(f => f.parentId == '889585373523615764' && f.name.includes('🌟》')).some(s => s.id == msg.channelId)) {
        msg.react('1039665999403819068');
        msg.react('1035719304219471913');
        msg.react('938639678603681842');
    }

    if (msg.channelId == '1022914793511850084') {
        msg.react('1035717696622428170');
        msg.react('938641123348475914');
    }
});
exports.messageCreateEvent = messageCreateEvent;
