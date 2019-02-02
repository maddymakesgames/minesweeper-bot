console.time('boot');

const Discord = require('discord.js');

const disabledEvents = ['CHANNEL_CREATE','CHANNEL_DELETE','CHANNEL_PINS_UPDATE','CHANNEL_UPDATE','GUILD_BAN_ADD','GUILD_BAN_REMOVE','GUILD_MEMBERS_CHUNK','GUILD_MEMBER_ADD','GUILD_MEMBER_REMOVE','GUILD_MEMBER_UPDATE','GUILD_ROLE_CREATE','GUILD_ROLE_DELETE','GUILD_ROLE_UPDATE','GUILD_SYNC','GUILD_UPDATE','MESSAGE_DELETE_BULK','MESSAGE_REACTION_ADD','MESSAGE_REACTION_REMOVE','MESSAGE_REACTION_REMOVE_ALL','MESSAGE_UPDATE','PRESENCE_UPDATE','RELATIONSHIP_ADD','RELATIONSHIP_REMOVE','RESUMED','TYPING_START','USER_GUILD_SETTINGS_UPDATE','USER_NOTE_UPDATE','USER_SETTINGS_UPDATE','USER_UPDATE','VOICE_SERVER_UPDATE','VOICE_STATE_UPDATE'];
const client = new Discord.Client({disabledEvents:disabledEvents, disableEveryone:true});

const conf = require('./config.json');

client.on('ready', () => {
    console.timeEnd('boot');
    console.log('ready to sweep some mines');
});

const minesweeper = require('./minesweeper.js');

client.on('message', (message) => {
    if(message.author.bot) return 'NO BOTS ALLOWED!!!!';
    if(!message.content.startsWith('ms!') && !message.mentions.users.has(client.user.id)) return 'Messages must start with :bomb:';

    message.content = message.content.slice(3, message.content.length);

    let args = message.content.split(' ');
    console.log(args);
    if(args[0] != 'start') return message.channel.send('Use ms!start to get a minesweeper game.');
    else {
        args = args.slice(1, args.length);
        if(!args[0]) args[0] = '5x5'
        let size = args[0].split('x');
        let bombs = args[1] || size[0]
        return minesweeper(size, bombs, message, client);
    }
});

client.login(conf.token);