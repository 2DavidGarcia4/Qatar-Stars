const { commands } = require("./interaction")
const { botDB } = require("../db")

let emojis = []

const readyEvent = async (client) => {
  console.log('Estoy listo', client.user.username)

  const server = client.guilds.cache.get(botDB.serverId)
  emojis = server.emojis.cache.map(({name, id})=> ({name, id}))
  // console.log(commands)
  // commands.forEach(async cmd=> {
  //   if(!(await server.commands.fetch()).some(s=> s.name==cmd.name)){
  //     server.commands.create(cmd).then(cm=> console.log('Nuevo comando creado', cm.name))
  //   }
  // })

  //? time
  //pr: 1031244320994496592
  //sv: 1029190950234370198

  //? news
  //pr: 1031244322131161188
  //sv: 1030621370100486144

  //? match:
  //pr: 1031244325918625792
  //sv: 1030214549305040926

  //? botinfo
  // pr: 1032708438142238730

  console.log((await server.commands.fetch()).map(m=> ({id: m.id, name: m.name})))
  // const command = commands.get('botinfo');
  // (await server.commands.fetch('1032708438142238730')).edit({description: command.description, options: command.options}).then(s=> console.log('update command'));
  // ;(await server.commands.fetch('1029496472716197989')).delete().then(c=> console.log('Comando eliminado'))
}

module.exports = {
  emojis, 
  readyEvent
}