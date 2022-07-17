require('dotenv').config({ path: '.env.develop'});
console.log(process.env);
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const devBotObj = require('./deviantArt.js');
const token = process.env.TOKEN;
const { run } = require('./utils/mongodbFuncs.js');

//Initialize bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

//Init Mongo
run();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  //Set a new item in the Collection
  //With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log("Ready");
  client.user.setUsername('Kush Guy 420');
  client.user.setActivity('Fortnite');
});

client.login(token);

client.on('message', () => {console.log('message received')})

client.on('interactionCreate', async interaction => {
  if(!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;
  
  try {
    console.log(`Executing: ${command}`)
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
  }
});


