const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

//Configure logger settings...?
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.lever = 'debug';

//Initialize bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', (user, userID, channelID, message, evt) => {
    if(message.substring(0,1) === '!'){
        let args = message.substring(1).split(' ');
        let cmd = args[0]

        args = args.splice(1);
        switch(cmd){
            //!ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            
        }
    }
})