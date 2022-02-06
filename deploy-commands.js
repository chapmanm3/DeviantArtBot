const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Dong'),
  new SlashCommandBuilder().setName('devart').setDescription('Returns a random Deviant Art picture from a supplied keyword'),
  new SlashCommandBuilder().setName('server').setDescription('Returns server info'),
  new SlashCommandBuilder().setName('user').setDescription('Returns user info')
].map(command => command.toJSON());

const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Succeessfully registered application commands."))
  .catch(console.error);
