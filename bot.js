const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

//Configure logger settings...?
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.lever = 'debug';

//Initialize bot
const bot = new Discord.Client();

bot.login(auth.token)

bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on("message", (message) => {
    if (message.author.bot) return;
})