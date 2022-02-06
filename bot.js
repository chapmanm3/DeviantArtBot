const { Client } = require('discord.js');
const auth = require('./auth.json');
const devBotObj = require('./deviantArt.js')

//Initialize bot
const client = new Client();

client.once('ready', (evt) => {
  console.log("Ready");
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName){
    case 'ping':
      await interaction.reply('Dong!');
      break;
    case 'devart':
      await interaction.reply('Command Under Construction');
      break;
    case 'server':
      await interaction.reply(`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`)
      break;
    case 'user':
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
      break;
  };
});

client.login(token);


