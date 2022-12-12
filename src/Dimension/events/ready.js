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
exports.readyEvent = void 0;
const db_1 = require("../db");
const interaction_1 = require("./interaction");
const readyEvent = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Estoy listo ' + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username));
    const server = client.guilds.cache.get(db_1.botDB.serverId);
    // console.log(server?.emojis.cache.filter(f=> f.animated).map(({name, id}) => ({name, id})))
    // client.user?.edit({avatar: server?.iconURL()})
    // console.log(client.guilds.cache.map(m=> ({name: m.name, id: m.id})))
    interaction_1.slashCommands.forEach((scmd) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (!((_b = (yield (server === null || server === void 0 ? void 0 : server.commands.fetch()))) === null || _b === void 0 ? void 0 : _b.some(s => s.name == scmd.name))) {
            server === null || server === void 0 ? void 0 : server.commands.create(scmd).then(c => console.log(`Comando ${c.name} creado.`));
        }
    }));
    // const command = slashCommands.get('anuncio')
    // ;(await server?.commands.fetch('1034508374219427931'))?.edit({options: command?.options}).then(c=> console.log(`Comando ${c.name} editado`))
    // console.log((await server?.commands.fetch())?.map(m=> ({id: m.id, name: m.name})))
});
exports.readyEvent = readyEvent;
