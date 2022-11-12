import { EmbedBuilder } from "discord.js";
import { botDB } from "../db.js";
import { emojis } from "../events/ready.js";

function levenshtainDistance(txt1='', txt2='') {
  let res = 0
  let orisontal = []
  for(let a=0; a<txt1.length; a++){
    console.log('--', orisontal)
    let lefth = a+2, up = 0, right = 0, newOrison = []
    for(let b=0; b<txt2.length; b++){
      console.log(orisontal[b], orisontal[b]+1, b)
      right = orisontal[b]==undefined ? b+2 : orisontal[b]+1

      if (b==0) {
        up = (txt1[a] == txt2[b] ? (a==b ? 0 : b+1) : a+1)
      }else{
        console.log('orison:', orisontal[b-1])
        up = (txt1[a] == txt2[b] ? orisontal[b-1] : (a==0 ? b+1 : orisontal[b-1]+1 ))
      }    
      
      res = Math.min(right, lefth || 1, up)
      
      console.log({lefth, up, right, res})
      newOrison[b] = res
      lefth = res+1
      
      if(b+1 == txt2.length) orisontal = newOrison
    }
  }
  return res
}

export const accentsTidy = (text) => {
  let r = text.toLowerCase();
  // r = r.replace(new RegExp(/\s/g),"");
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");                
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  // r = r.replace(new RegExp(/\W/g),"");
  return r;
};


export const sendError = (int, description) => {
  const errorEb = new EmbedBuilder({title: 'Error', description})
  .setColor('Red')

  int.reply({ephemeral: true, embeds: [errorEb]})
}

export const toListTeam = (array) => array.map((m, i)=> {
  const emoji = emojis.find(f=> f.name.replace(/_/g, ' ') == accentsTidy(m))

  if(emoji) return `<:${emoji.name}:${emoji.id}> ${i+1}. ${m.replace(m[0], m[0].toUpperCase())}`
  else return `${i+1}. ${m.replace(m[0], m[0].toUpperCase())}`
  
}).join('\n')