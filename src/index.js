import { ActivityType, Client, EmbedBuilder, time } from "discord.js";
import { tokenBot, tokenFotball } from "./config.js";
import { shardError, unhandledRejection } from "./events/errors.js"
import fetch from "node-fetch"
import { botDB } from "./db.js";
import { commands, interactionEvent } from "./events/interaction.js";
import { emojis, readyEvent } from "./events/ready.js";
import { sendError, accentsTidy } from "./utils/index.js";
import { qatarStarsDb } from "./models/index.js";

const bot = new Client({intents: 131071, presence: {activities: [{name: 'QATAR STARS 🌟', type: ActivityType.Watching}]}})

export let matches = []

bot.on('ready', async () => {
  readyEvent(bot)

  // const matchesDb = {}
  // botDB.selections.sort().forEach(se=> matchesDb[accentsTidy(se).replace(/ +/g, '_')] = {rivals: []})

  // setTimeout(async () => {
  //   const newDb = await qatarStarsDb.create({
  //     _id: bot.user.id,
  //     matches: matchesDb
  //   })
  
  //   await newDb.save()
  // }, 10000);

  ;
  (function obtener () {
    setTimeout(()=> {
      qatarStarsDb.findById(bot.user.id).then(res=> {
        matches = res.matches
        console.log('Partidos cargados')
      }).catch(()=> {
        obtener()
      })
    }, 2000)
  })()


  const server = bot.guilds.cache.get(botDB.serverId)

  // console.log((await server.commands.fetch()).map(m=> ({id: m.id, name: m.name})))
  // ;(await server.commands.fetch('1029181451536715806')).edit({description: "", options})

  let liveScores = []
  let ejecution = false, commentary = 0, live = false
  const commentariesChannel = bot.channels.cache.get('1023973143821422653'), goalsChannel = bot.channels.cache.get('1023976964140302407')
  // const commentariesChannel = bot.channels.cache.get('897593930630197259'), goalsChannel = bot.channels.cache.get('897593930630197259')

  const liveScoreNowsUrl = 'https://soccer.sportmonks.com/api/v2.0/livescores/now?api_token='+tokenFotball
  // const liveScoreNowsUrl = 'https://soccer.sportmonks.com/api/v2.0/fixtures/between/2022-10-10/2022-11-01?api_token='+tokenFotball

  setInterval(async ()=> {
    // console.log('haa')
    if(liveScores.length == 0){
      // console.log('Snac')
      fetch(liveScoreNowsUrl).then(prom=> prom.json()).then(async res=> {
        liveScores = res.data
        if(res.data.length > 0) live = true
        else {
          live = false
          commentary = 0
        }

        if(liveScores.length > 0){
          
          try {
            const fixture = liveScores[0]
            if(fixture.time.status.toLowerCase() != 'live') return
            if(!fixture.commentaries) return
            const logEb = new EmbedBuilder({title: 'Empezó el partido'})
            .setColor('#00ff00')
            bot.channels.cache.get(botDB.channelLogs).send({embeds: [logEb], content: '<@717420870267830382>, <@825186118050775052>'})
            console.log(fixture.id)

            const firstStats = (await fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/${fixture.id}?api_token=${tokenFotball}&include=stats`).then(prom=> prom.json())).data.stats
            console.log(firstStats)
            const teamOne = (await fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${firstStats.data[0].team_id}?api_token=`+tokenFotball).then(prom => prom.json())).data
            const teamTwo = (await fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${firstStats.data[1].team_id}?api_token=`+tokenFotball).then(prom => prom.json())).data
            
            // const prcments = (await fetch(`https://soccer.sportmonks.com/api/v2.0/commentaries/fixture/${fixture.id}?api_token=`+tokenFotball).then(prom=> prom.json())).data.slice(90, 114).reverse()
            let laps = 1
    
            let intervalo = setInterval(async ()=> {
              if(!live) return clearInterval(intervalo)

              const commentaries = (await fetch(`https://soccer.sportmonks.com/api/v2.0/commentaries/fixture/${fixture.id}?api_token=`+tokenFotball).then(prom=> prom.json())).data
              // const commentaries = prcments.slice(0, laps).reverse()
              const firsCommentary = commentaries[0]
              console.log(firsCommentary)
    
              if(firsCommentary.order != commentary){
                const stats = (await fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/${fixture.id}?api_token=${tokenFotball}&include=stats`).then(prom=> prom.json())).data.stats
                const firstTeamEmoji = emojis.find(f=> f.name == accentsTidy(teamOne.name).replace(/ +/g, '_')) || '', firstEmojiTxt = firstTeamEmoji ? `<:${firstTeamEmoji.name}:${firstTeamEmoji.id}>` : ''
                const lastTeamEmoji = emojis.find(f=> f.name == accentsTidy(teamTwo.name).replace(/ +/g, '_')) || '', lastEmojiTxt = lastTeamEmoji ? `<:${lastTeamEmoji.name}:${lastTeamEmoji.id}>` : ''
                const finalComment = firsCommentary.comment.split('-').map((m, i, a)=> i==1 && a.length>2 ? m+'\n' : m).join(' ')
    
                const commentaryEb = new EmbedBuilder()
    
                if(firsCommentary.important){
                  const cardsColors = ['yellow', 'red']
                  if(cardsColors.some(s=> firsCommentary.comment.includes(s))){
                    const colorCard = cardsColors.find(f=> firsCommentary.comment.includes(f))
    
                    commentaryEb
                    .setTitle(`${botDB.emojis[colorCard+'Card']} ${colorCard.replace(colorCard[0], colorCard[0].toUpperCase())} card`)
                    .setDescription(`Minute **${firsCommentary.minute}**\n*${finalComment}*`)
                    .setColor(colorCard.replace(colorCard[0], colorCard[0].toUpperCase()) || botDB.color)
                  }
                }else{
    
                  if(commentary == 0){
                    commentaryEb
                    .setTitle(`🎮 Start the match`)
                    .setDescription(`**${teamOne.name} ${firstEmojiTxt} vs ${lastEmojiTxt} ${teamTwo.name}**\n\nMinute **${firsCommentary.minute}**\n*${finalComment}*`)
                    .setColor('Green')
                  
                  }else{
                    commentaryEb
                    .setTitle(`💬 Commentary`)
                    .setDescription(`Minute **${firsCommentary.minute}**\n*${finalComment}*`)
                    .setColor(botDB.color)
                  }
                }
    
                if(firsCommentary.goal){
                  const goalEb = new EmbedBuilder()
                  goalEb
                  .setTitle(`${botDB.emojis.ball} !Gooool¡`)
                  .setDescription(`**${teamOne.name}** ${firstEmojiTxt}  **${stats.data[0].goals}** - **${stats.data[1].goals}**  ${lastEmojiTxt} **${teamTwo.name}**\n\nMinute **${firsCommentary.minute}**\n*${finalComment}*`)
                  .setColor('Green')
                  goalsChannel.send({embeds: [goalEb]})
    
                  commentaryEb
                  .setTitle(`${botDB.emojis.ball} !Gooool¡`)
                  .setDescription(`**${teamOne.name}** ${firstEmojiTxt}  **${stats.data[0].goals}** - **${stats.data[1].goals}**  ${lastEmojiTxt} **${teamTwo.name}**\n\nMinute **${firsCommentary.minute}**\n*${finalComment}*`)
                  .setColor('Green')
                }
                commentariesChannel.send({embeds: [commentaryEb]})
    
                commentary = firsCommentary.order
                laps++
              }
            }, 60000)
          } catch (error) {
           console.log(error.message, error) 
          }

        }
      }).catch(err=> console.log(err))
    
    }
  }, 3*60000)
})


bot.on('interactionCreate', interaction => {
  interactionEvent(interaction, bot)
  
  // interaction.guild.preferredLocale

  // if(interaction.isChatInputCommand()){
  //   const { options, commandName } = interaction, subcommand = options.getSubcommand(true)
    
  //   interaction.options.getString('country')
  //   interaction.guildLocale
  // }

  
})

bot.on('shardError', (error) => {
  shardError(error, bot)
})

process.on("unhandledRejection", error=> {
  unhandledRejection(error, bot)  
})

bot.login(tokenBot)