const { connect } = require("mongoose")
const { connectDb } = require("./config")

connect(connectDb)
.then(()=> console.log('Connected to DB'))
.catch((error) => console.log(error))

// guild: 1023968834199228466
// pr: 825191912830926898
const botDB = {
  color: '#120A78',
  serverId: '1023968834199228466',
  creatorId: '717420870267830382',
  channelLogs: '1033545825730711552',
  emojis: {
    ball: '<:ball:1031979701012529223>',
    yellowCard: '<:yellow_card:1031979836899602442>',
    redCard: '<:red_card:1031979782566588598>'
  },
  selections: ['alemania', 'argentina', 'brasil', 'francia', 'croacia', 'polonia', 'españa', 
  'inglaterra', 'gales', 'portugal', 'uruguay', 'costa rica', 'catar', 'dinamarca', 
  'bélgica', 'serbia', 'suiza', 'paises bajos', 'corea del sur', 'japón', 'irán', 'ecuador', 
  'méxico', 'estados unidos', 'canadá', 'senegal', 'ghana', 'túnez', 'camerún', 'marruecos', 'australia', 'arabia saudita'],
  continentsSelections: {
    america: ['méxico', 'argentina', 'brasil', 'uruguay', 'costa rica', 'ecuador', 'estados unidos', 'canadá'],
    europa: ['alemania', 'francia', 'croacia', 'polonia', 'españa', 'inglaterra', 'gales', 'portugal', 'dinamarca', 'bélgica', 'serbia', 
    'suiza', 'paises bajos', ],
    africa: ['senegal', 'ghana', 'túnez', 'camerún', 'marruecos'],
    asia: ['catar', 'corea del sur', 'japón', 'irán', 'arabia saudita'],
    oceania: ['australia']
  },
  teams: {
    a: ['catar', 'ecuador', 'senegal', 'paises bajos'],
    b: ['inglaterra', 'irán', 'estados unidos', 'gales'],
    c: ['argentina', 'arabia saudita', 'méxico', 'polonia'],
    d: ['francia', 'australia', 'dinamarca', 'túnez'],
    e: ['españa', 'costa rica', 'alemania', 'japón'],
    f: ['bélgica', 'canadá', 'marruecos', 'croacia'],
    g: ['brasil', 'serbia', 'suiza', 'camerún'],
    h: ['portugal', 'ghana', 'uruguay', 'corea del sur']
  }
}

module.exports = {botDB}