const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { botDB } = require("../db");
const { qatarStarsDb } = require("../models/index");
const { sendError } = require("../utils/index");
const { accentsTidy } = require("../utils/index");
const { matches } = require("../index");

const matchScb = new SlashCommandBuilder()
.setName('match')
.setNameLocalizations({
  'es-ES': 'partido',
  'en-US': 'match'
})
.setDescription('Party options.')
.setDescriptionLocalizations({
  'es-ES': 'Opciones de partido',
  'en-US': 'Party options.'
})
.addSubcommand(add=> 
  add.setName('add')
  .setNameLocalizations({
    'es-ES': 'agregar',
    'en-US': 'add'
  })
  .setDescription('Add next game.')
  .setDescriptionLocalizations({
    'es-ES': 'Agregar próximo partido.',
    'en-US': 'Add next game.'
  })
  .addStringOption(team=> 
    team.setName('team')
    .setNameLocalizations({
      'es-ES': 'equipo',
      'en-US': 'team'
    })
    .setDescription('Name of the team.')
    .setDescriptionLocalizations({
      'es-ES': 'Nombre del equipo',
      'en-US': 'Name of the team.'
    })
    .setRequired(true)
  )
  .addStringOption(rival=> 
    rival.setName('rival')
    .setDescription('Rival name.')
    .setDescriptionLocalizations({
      'es-ES': 'Nombre del rival.',
      'en-US': 'Rival name.'
    })
    .setRequired(true)
  )
  .addStringOption(date=> 
    date.setName('date')
    .setNameLocalizations({
      'es-ES': 'fecha',
      'en-US': 'date'
    })
    .setDescription('Release date.')
    .setDescriptionLocalizations({
      'es-ES': 'Fecha de estreno.',
      'en-US': 'Release date.'
    })
    .setRequired(true)
  )
  .addStringOption(stadium=> 
    stadium.setName('stadium')
    .setNameLocalizations({
      'es-ES': 'estadio',
      'en-US': 'stadium'
    })
    .setDescription('Name of the stadium.')
    .setDescriptionLocalizations({
      'es-ES': 'Nombre del estadio.',
      'en-US': 'Name of the stadium.'
    })
    .setRequired(true)
  )
  .addStringOption(urlInfo=> 
    urlInfo.setName('url')
    .setDescription('Stadium url.')
    .setDescriptionLocalizations({
      'es-ES': 'Url del estadio.',
      'en-US': 'Stadium url.'
    })
    .setRequired(true)
  )
)
.addSubcommand(edit=> 
  edit.setName('edit')
  .setNameLocalizations({
    'es-ES': 'editar',
    'en-US': 'edit'
  })
  .setDescription('Edit match.')
  .setDescriptionLocalizations({
    'es-ES': 'Editar partido.',
    'en-US': 'Edit match.'
  })
  
)
.addSubcommand(del=> 
  del.setName('delete')
  .setNameLocalizations({
    'es-ES': 'eliminar',
    'en-US': 'delete'
  })
  .setDescription('Delete a match.')
  .setDescriptionLocalizations({
    'es-ES': 'Eliminar un partido.',
    'en-US': 'Delete a match.'
  })
)
.setDefaultMemberPermissions(PermissionFlagsBits.Administrator).toJSON()


const matchSlashCommand = async (int, client) => {
  const { options, commandName } = int, subcommand = options.getSubcommand(true)

  if(subcommand == 'add'){
    const team = botDB.selections.find(f=> accentsTidy(f) == options.getString('team')), rival = botDB.selections.find(f=> accentsTidy(f) == options.getString('rival')), date = new Date('2022/'+options.getString('date')).getTime(), stadium = options.getString('stadium'), url = options.getString('url') 
    
    console.log({team, rival, date})

    if(!team) return sendError(int, 'El equipo no se encuentra en ningun grupo.')
    if(!rival) return sendError(int, 'El quipo rival no se encuentra en ningun grupo.')
    if(date <= Date.now()) return sendError(int, 'La fecha que proporcionaste es incorecta por que es antigua.')
    const matchTeam = matches[accentsTidy(team).replace(/ +/g, '_')]
    const matchRival = matches[accentsTidy(rival).replace(/ +/g, '_')]
    if(matchTeam.rivals.some(s=> accentsTidy(s.team)==rival)) return sendError(int, 'Ese rival ya esta agregado')

    matchTeam.rivals.push({
      date,
      team: rival,
      stadium,
      url
    })

    matchRival.rivals.push({
      date,
      team,
      stadium,
      url
    })

    await qatarStarsDb.findByIdAndUpdate(client.user.id, { matches })

    const matchAddEb = new EmbedBuilder()
    .setTitle('Partido agregado')
    .setDescription(`Se agrego el partido de **${team}** vs **${rival}** en el estadio **[${stadium}](${url})**.`)
    .setColor('Green')
    int.reply({ephemeral: true, embeds: [matchAddEb]})
  }

  if(subcommand == 'edit'){}

  if(subcommand == 'delete'){}
}

module.exports = {
  matchScb,
  matchSlashCommand
}