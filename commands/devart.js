const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const devArtApi = require('../deviantArt');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('devart')
    .setDescription('Grabs a random Deviant Art picture from supplied key word test')
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Tag to search Devaint Art for')
        .setRequired(true)),
  async execute(interaction){
    const tag = interaction.options.getString('tag');
    const userId = interaction.user.id;
    const url = await devArtApi.searchWithTag(userId, tag);

    await interaction.reply(`${url}`);
  }
};
