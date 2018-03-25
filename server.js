const Discord = require("discord.js");
require('events').EventEmitter.prototype._maxListeners = 100;
const client = new Discord.Client;
const pkg = require('./package.json');

// Ples keep it alive ;-;
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const DBL = require("dblapi.js");
// const dbl = new DBL('');

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`!!help with ${client.users.size} users`);
    client.user.setStatus('dnd');
    // dbl.postStats(client.guilds.size);
    client.user.setUsername('FungiBot');
    client.user.setActivity("_help for help");
});

client.on("message", async message => {
  
  if (!message.guild || message.author.bot) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === "info") {
    message.channel.send({embed: {
      "title": "FungiBot Info",
      "description": "In the works",
      footer: {
        "text": `Requested by ${message.author}`,
        "icon_url": `**${message.author.avatarURL}**`
      }
    }});  }
  
  if (command === "ping") {
   message.channel.send("Lol ponged"); 
  }  
  
  if (command === "help") {
    const embed = new Discord.RichEmbed()
   .setTitle("FungiBot Help Section")   
   .addField("Help Section", "The help section for FungiBot. Do _help")
   .addField("Info", "Bot info by doing _info")
   .addField("Ping", "Get a pretty dank pong _ping")
   .setColor(322443)
   .setFooter(`FungiBot v${pkg.version}`)
   message.channel.send(embed);  }
  
  if (command === "meme") {
    
    const randomMeme = require("./randmeme.js");
    
    randomMeme()
        .then(url => {
          let embed = new Discord.RichEmbed()
            .setTitle("Random Meme")
            .setColor(244591)
            .setImage(url);
          message.channel.send(embed);
      })
  }
});



// Invite Link https://discordapp.com/oauth2/authorize?client_id=426556559007547392&scope=bot&permissions=269872128
client.login(process.env.TOKEN);
